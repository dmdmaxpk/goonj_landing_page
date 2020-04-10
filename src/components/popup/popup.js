import React from 'react';
import ReactGA from "react-ga";
import Axios from 'axios';
import  config  from '../../config/config';
import {Event} from '../Tracking';

export default class  Popup extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      data: [],
      packageId: '',
      doubleConsent: false,
      btnDisable: true
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.cancel = this.cancel.bind(this);
    // this.testSubscribe = this.testSubscribe.bind(this);
  }
  componentDidMount(){
  Axios.get(`${config.base_url}/pageview?source=HE&msisdn=${this.props.msisdn}`)
  .then(console.log("Page View Recorded"))
  .catch(console.error());

  if(this.props.msisdn){
      Axios.get(`${config.base_url}/user/graylist/${this.props.msisdn}?source=HE`)
      .then(res => {
        let data = res.data; 
        // console.log(data);

        Event("Count", "Load", "Landing");
        if(data){
          this.setState({data});
          if(data.subscription_status === "billed" || data.subscription_status === "trial" || data.subscription_status === "graced"){
            Event("Count", "Load", "Already Subscribed");
            window.location.href = `${config.mainWebsiteUrl}/live-tv?msisdn=${this.props.msisdn}`;
          }
          else if(data.subscription_status === "expired" || data.subscription_status === "not_billed" || data.is_gray_listed === true || data.code === 6){
            this.setState({btnDisable: false});
          }
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
    Axios.get(`${config.base_url}/package?source=HE`)
    .then(res =>{
      // console.log(res.data[0])
      let packageData = res.data[0];
      this.setState({
        packageId: packageData._id
      })
    })
  }
  subscribe(){
    const userData = {
      msisdn: this.props.msisdn,
      package_id: this.state.packageId,
      source: "HE",
      marketing_source: this.props.mid,
      affiliate_unique_transaction_id: this.props.tid,
      affiliate_mid: this.props.mid

    }
    // console.log('user', userData);
    Axios.post(`${config.base_url}/payment/subscribe`, userData)
    .then(res =>{
      if(res.data.code === 11 && res.data.message === "Trial period activated!"){
        console.log("Trial Event");
        Event("Click", "Trial Activated With Msisdn", this.props.msisdn);
      }
      else if(res.data.code === 10 && res.data.message === "In queue for billing!"){
        Event("Count", "Click", "Queued for billing");
      }
      setTimeout(() => {
        window.location.href = `${config.mainWebsiteUrl}/live-tv?msisdn=${this.props.msisdn}`
      }, 2000);
    })
    .catch(err =>{
      alert("Something went wrong! :(");
    })
  }
  cancel(){
    Event("Count", "Click", "Cancel");
    this.setState({doubleConsent: false});
  }
  handleSubmit(){
      Event("Count", "Click", "Subscribe Button Click");
      Event("Click", "Test Case S-1", this.props.msisdn);
      if(this.state.data.subscription_status === "expired" || this.state.data.subscription_status === "not_billed" || this.state.data.is_gray_listed === true){
        this.setState({doubleConsent: true});
        Event("Count", "Click", "Double Consent");
      }
      else if(this.state.data.code === 6){
        Event("Click", "Test Case T-2", "testing");
        Event("Click", "Test Case T-1", this.props.msisdn);
        this.subscribe();
      }
  }

  render() {
    return (
        <div className="popup">

          {this.state.doubleConsent === false ?
            <div className="popup_content">
            <div className="">
              <img className="goonj_logo" src={require("../../assets/logo.png")} />
            </div>
            <div className="">
              <div className="popup_text_1">TO START YOUR FREE</div>
              <div className="popup_text_2">ONE DAY TRIAL CLICK ON</div>
              <div className="popup_text_3">SUBSCRIBE</div>
            </div>
            {this.state.btnDisable === true ? 
              <div className="">
                {/* <button className="button" onClick={this.handleSubmit} disabled>
                  <div style={{float: "left", marginLeft: "8%"}}>SUBSCRIBE NOW</div>
                  <img src={require("../../assets/t-logo.png")} style={{float: "right", height: "20px", marginRight: "8%"}} />
                </button> */}
              </div>
              :
              <div className="">
                <button className="button" onClick={this.handleSubmit}>
                  <div style={{float: "left", marginLeft: "8%"}}>SUBSCRIBE NOW</div>
                  <img src={require("../../assets/t-logo.png")} style={{float: "right", height: "20px", marginRight: "8%"}} />
                </button>
              </div>
            }
          </div>
          :
          <div className="popup_content">
            <div className="">
              <img className="goonj_logo" src={require("../../assets/logo.png")} />
            </div>
            <div className="">
              <div className="popup_text_1">PROCEED?</div>
            </div>
            <div className="">
              <button className="btnDoubleConsent btnYes" onClick={this.subscribe}>
                  <div style={{float: "left", marginLeft: "8%"}}>YES</div>
              </button>
              <button className="btnDoubleConsent btnNo" onClick={this.cancel}>
                  <div style={{float: "RIGHT", marginRight: "8%"}}>NO</div>
              </button>
            </div>
          </div>
          }
        </div>
    );
  }
}

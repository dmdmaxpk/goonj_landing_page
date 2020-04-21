import React from 'react';
import Axios from 'axios';
import  config  from '../../config/config';
import "./goonj.css";
import { Event } from '../Tracking';

class Box extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      data: [],
      packageId: '',
      doubleConsent: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.cancel = this.cancel.bind(this);
  }
  componentDidMount(){
    Event("Count", "Verified Through GoonjHE", this.props.msisdn);
    Axios.get(`${config.base_url}/user/graylist/${this.props.msisdn}?source=web`)
    .then(res => {
      let data = res.data; 
      console.log(data);
      if(data){
        this.setState({data});
        if(data.subscription_status === "billed" || data.subscription_status === "trial" || data.subscription_status === "graced"){
          Event("Count", "Load", "Already Subscribed GoonjHE");
          window.location.href = `${config.mainWebsiteUrl}/channel/${this.props.slug}?msisdn=${this.props.msisdn}&iden=true`;
        }
      }
    })
    .catch(err => {
      console.log(err);
    })
  }
  subscribe(){

    const userData = {
      msisdn: this.props.msisdn,
      package_id: this.props.packageID,
      source: "web",
    }
    Axios.post(`${config.base_url}/payment/subscribe`, userData)
    .then(res =>{
      Event("Count", "Click", "Trial or Subscribed GoonjHE");
      if(res.data.code === 11 && res.data.message === "Trial period activated!"){
        console.log("Trial Event");
        Event("Count", "Click", "Trial Activated GoonjHE");
      }
      else if(res.data.code === 10 && res.data.message === "In queue for billing!"){
        Event("Count", "Click", "Subscribed GoonjHE");
      }
      setTimeout(() => {
        window.location.href = `${config.mainWebsiteUrl}/channel/${this.props.slug}?msisdn=${this.props.msisdn}&iden=true`
      }, 2000);
    })
    .catch(err =>{
      alert("Something went wrong! :(");
    })
  }
  cancel(){
    this.setState({doubleConsent: false});
  }
  handleSubmit(){
    Event("Count", "Click", "GoonjHE Subscribe Btn Click");
      if (this.state.data.subscription_status === "expired" ||
          this.state.data.subscription_status === "graced"  ||
          this.state.data.subscription_status === "not_billed" ||
          this.state.data.is_gray_listed === true ||
          this.state.data.code === 6){
            this.setState({doubleConsent: true});
      }
  }

  render() {
    return (
        <div className="box">
            {this.state.doubleConsent === false ?
                        <button className="btnSub" onClick={this.handleSubmit}>
                            <img className="btnSubImg" src={require("../../assets/subBtn.png")} />
                        </button>
        :
            // <div className="">
                <div className="">
                    <p className="text1">Are you sure<br />you want to subscribe?</p>
                    <button className="btnSubConfirm" onClick={this.subscribe}>
                        <img className="confirmBtnImg" src={require("../../assets/Shape-2.png")} />
                        <p className="btnConfirmText">Confirm</p>
                    </button>
                </div>
            // </div>
        }
        </div>
    );
  }
}

export default Box;
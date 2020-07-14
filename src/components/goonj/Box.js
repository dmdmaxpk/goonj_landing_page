import React from 'react';
import Axios from 'axios';
import  config  from '../../config/config';
import "./goonj.css";
import { Event } from '../Tracking';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';

class Box extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      data: [],
      packageId: '',
      doubleConsent: false,
      radio: this.props.packageID1,
      loading: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.cancel = this.cancel.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
  }
  componentDidMount(){
    Event("Count", "Verified Through GoonjHE", this.props.msisdn);
    console.log("package id",this.props.packageID)
    Axios.get(`${config.base_url}/user/graylist/${this.props.msisdn}?source=${this.props.source}&package_id=${this.props.packageID1}`)
    .then(res => {
      let data = res.data; 
      console.log(data);
      if(data){
        this.setState({data});
        if(data.subscription_status === "billed" || data.subscription_status === "trial" || data.subscription_status === "graced"){
          Event("Count", "Load", "Already Subscribed GoonjHE");
          {this.props.slug ? 
            window.location.href = `${config.mainWebsiteUrl}/channel/${this.props.slug}?msisdn=${this.props.msisdn}&iden=true&package_id=${this.props.packageID1}`
          :
            window.location.href = `${this.props.postUrl}?msisdn=${this.props.msisdn}&iden=true&CPpackage_id=${this.props.packageID1}`
          }
        }
        else{
          Axios.get(`${config.base_url}/user/graylist/${this.props.msisdn}?source=${this.props.source}&package_id=${this.props.packageID2}`)
          .then(res => {
            let data = res.data; 
            console.log(data);
            if(data){
              this.setState({data});
              if(data.subscription_status === "billed" || data.subscription_status === "trial" || data.subscription_status === "graced"){
                Event("Count", "Load", "Already Subscribed GoonjHE");
                {this.props.slug ? 
                  window.location.href = `${config.mainWebsiteUrl}/channel/${this.props.slug}?msisdn=${this.props.msisdn}&iden=true&package_id=${this.props.packageID2}`
                :
                  window.location.href = `${this.props.postUrl}?msisdn=${this.props.msisdn}&iden=true&CPpackage_id=${this.props.packageID2}`
                }
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
        }
      }
    })
    .catch(err => {
      console.log(err);
    });
  }
  subscribe(){
    this.setState({loading: true});

    const userData = {
      msisdn: this.props.msisdn,
      package_id: this.props.packageID,
      source: this.props.source,
    }
    Axios.post(`${config.base_url}/payment/subscribe`, userData)
    .then(res =>{
      if(res.data.code === -1){
        this.setState({loading: false});
        alert(res.data.message);
      }
      Event("Count", "Click", "Trial or Subscribed GoonjHE");
      if(res.data.code === 11 && res.data.message === "Trial period activated!"){
        console.log("Trial Event");
        Event("Count", "Click", "Trial Activated GoonjHE");
      }
      else if(res.data.code === 10 && res.data.message === "In queue for billing!"){
        Event("Count", "Click", "Subscribed GoonjHE");
      }
      setTimeout(() => {
        {this.props.slug ?
          window.location.href = `${config.mainWebsiteUrl}/channel/${this.props.slug}?msisdn=${this.props.msisdn}&iden=true&package_id=${res.data.package_id}`
        :
          window.location.href = `${this.props.postUrl}?msisdn=${this.props.msisdn}&iden=true&CPpackage_id=${res.data.package_id}`;
        }
      }, 2000);
    })
    .catch(err =>{
      this.setState({loading: false});
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
  handleRadio(e){
    console.log(e);
    this.setState({
      radio: e
    })
  }

  render() {
    console.log(this.props);
    return (
        <div className="box">
            {this.state.doubleConsent === false ?
              this.state.loading === false ?
                <button className="btnSub" onClick={this.handleSubmit}>
                    <img className="btnSubImg" src={require("../../assets/subBtn.png")} />
                </button>
              :
                <Loader
                  type="Rings"
                  color="#00BFFF"
                  height={100}
                  width={100}
                />
        :
                <div className="">
                    <p className="text1">Are you sure<br />you want to subscribe?</p>
                    {this.state.loading === false ?
                      <button className="btnSubConfirm" onClick={this.subscribe}>
                        <img className="confirmBtnImg" src={require("../../assets/Shape-2.png")} />
                        <p className="btnConfirmText">Confirm</p>
                      </button>
                    :
                      <Loader
                        type="ThreeDots"
                        color="#00BFFF"
                        height={100}
                        width={100}
                      />
                    }
                </div>
        }
        </div>
    );
  }
}

export default withRouter(Box);
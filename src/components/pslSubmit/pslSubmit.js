import React from 'react';
// import Axios from 'axios';
import  config  from '../../config/config';
import PaywallInstance from '../../config/PaywallInstance';

export default class  PslSubmit extends React.Component {

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
    PaywallInstance.get(`${config.base_url}/user/graylist/${this.props.msisdn}`)
    .then(res => {
      let data = res.data; 
      console.log("greylist", data);
      if(data){
        this.setState({data});
        if(data.subscription_status === "billed" || data.subscription_status === "trial" || data.subscription_status === "graced"){
          window.location.href = `${config.mainWebsiteUrl}/live-tv?msisdn=${this.props.msisdn}`;
        }
      }
    })
    .catch(err => {
      console.log(err);
    })
    PaywallInstance.get(`${config.base_url}/package`)
    .then(res =>{
      console.log(res.data[1])
      let packageData = res.data[1];
      this.setState({
        packageId: packageData._id
      })
    })
  }
  subscribe(){
    const userData = {
      // msisdn: this.props.msisdn,
      // package_id: this.state.packageId,
      // source: "HE",
      // marketing_source: this.props.src,
      // affiliate_unique_transaction_id: this.props.tid,
      // affiliate_mid: this.props.mid
    }
    // console.log('user', userData);
    PaywallInstance.post(`${config.base_url}/payment/subscribe`, userData)
    .then(res =>{
      // console.log(res);
      window.location.href = `${config.mainWebsiteUrl}/live-tv?msisdn=${this.props.msisdn}`
    })
    .catch(err =>{
      alert("Something went wrong! :(");
    })
  }
  cancel(){
    this.setState({doubleConsent: false});
  }
  handleSubmit(){
      if(this.state.data.subscription_status === "expired" || this.state.data.subscription_status === "graced" || this.state.data.is_gray_listed === true){
        this.setState({doubleConsent: true});
      }
      if(this.state.data.subscription_status === "billed" || this.state.data.subscription_status === "trial"){
        window.location.href = `${config.mainWebsiteUrl}/live-tv?msisdn=${this.props.msisdn}`;
      }
      else if(this.state.data.code === 6){
        this.subscribe();
      }
  }

  render() {
    return (
      <div>
        <button class="btnSubmitPsl" onClick={this.handleSubmit} style={{display: this.state.doubleConsent === true ? "none" : ""}}>Submit</button>
        {this.state.doubleConsent === false ?
        ""
          :
          <div className="consentBox">
            <div className="popup_text_1">Proceed?</div>
            <button className="btnDoubleConsent btnYes pslYes" onClick={this.subscribe}>Yes</button>
            <button className="btnDoubleConsent btnNo pslYes" onClick={this.cancel}>No</button>
          </div>
        }
      </div>

    );
  }
}

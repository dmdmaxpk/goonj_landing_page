import React from 'react';
import Axios from 'axios';
import  config  from '../../config/config';
import "./goonj.css";
// import { Logo } from '../../assets/logo.png'

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
    Axios.get(`${config.base_url}/user/graylist/${this.props.msisdn}`)
    .then(res => {
      let data = res.data; 
      console.log(data);
      if(data){
        this.setState({data});
        if(data.subscription_status === "billed" || data.subscription_status === "trial" || data.subscription_status === "graced"){
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
      window.location.href = `${config.mainWebsiteUrl}/channel/${this.props.slug}?msisdn=${this.props.msisdn}&iden=true`
    })
    .catch(err =>{
      alert("Something went wrong! :(");
    })
  }
  cancel(){
    this.setState({doubleConsent: false});
  }
  handleSubmit(){
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
                <div className="boxBgDiv">
                    <img className="boxBgImg" src={require("../../assets/boxbg.png")} />
                    <div className="bbTextDiv">
                        <p className="text1">Free 24 hours trial & then</p>
                        <p className="text2">Rs. {this.props.pkgPrice}/DAY!</p>
                        <p className="text3">charged from your mobile balance</p>
                        <button className="btnSub" onClick={this.handleSubmit}>
                            <img className="btnSubImg" src={require("../../assets/btnTelenor.png")} />
                        </button>
                        <p className="text4">
                            I agree to daily recurring charges deduction from my mobile <br />
                            balance until Unsubscription
                        </p>
                    </div>
                </div>
        :
            <div className="boxBgDiv">
                <img className="boxBgImg" src={require("../../assets/boxbg.png")} />
                <div className="bbTextDiv">
                    <p className="text1">Are you sure<br />you want to subscribe?</p>
                    <button className="btnSubConfirm" onClick={this.subscribe}>
                        <img src={require("../../assets/Shape-2.png")} />
                        <p className="btnConfirmText">Confirm</p>
                    </button>
                </div>
            </div>
        }
        </div>
    );
  }
}

export default Box;
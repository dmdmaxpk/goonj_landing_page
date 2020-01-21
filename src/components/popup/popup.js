import React from 'react';
import Axios from 'axios';
import { config } from '../../config/config';
// import { Logo } from '../../assets/logo.png'

export default class  Popup extends React.Component {

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
    // console.log(this.props.msisdn);
    Axios.get(`${config.base_url}/user/graylist/${this.props.msisdn}`)
    .then(res => {
      let data = res.data; 
      // console.log(data);
      if(data){
        this.setState({data});
        if(data.subscription_status === "billed" || data.subscription_status === "trial" || data.subscription_status === "graced"){
          window.location.href = `http://web.st.goonj.pk/live-tv?msisdn=${this.props.msisdn}`;
        }
      }
    })
    .catch(err => {
      console.log(err);
    })
    Axios.get(`${config.base_url}/package`)
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
      marketing_source: this.props.src
    }
    // console.log('user', userData);
    Axios.post(`${config.base_url}/payment/subscribe`, userData)
    .then(res =>{
      // console.log(res);
      window.location.href = `http://web.st.goonj.pk/live-tv?msisdn=${this.props.msisdn}`
    })
    .catch(err =>{
      alert("Something went wrong! :(");
    })
  }
  cancel(){
    this.setState({doubleConsent: false});
  }
  handleSubmit(){
      if(this.state.data.subscription_status === "expired" || this.state.data.subscription_status === "graced"){
        this.setState({doubleConsent: true});
      }
      if(this.state.data.subscription_status === "billed" || this.state.data.subscription_status === "trial"){
        window.location.href = `http://web.st.goonj.pk/live-tv?msisdn=${this.props.msisdn}`;
      }
      else if(this.state.data.code === 6){
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
            <div className="">
              <button className="button" onClick={this.handleSubmit}>
                <div style={{float: "left", marginLeft: "8%"}}>SUBSCRIBE NOW</div>
                <img src={require("../../assets/t-logo.png")} style={{float: "right", height: "20px", marginRight: "8%"}} />
              </button>
            </div>
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

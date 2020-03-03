import React from 'react';
import Axios from 'axios';
import  config  from '../../config/config';
import "./goonj.css";
import Box from './Box';
// import { Logo } from '../../assets/logo.png'

class PslComponent extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      data: [],
      packageId: '',
      doubleConsent: false,
      packagePrice: ''
    }
  }
  componentDidMount(){
    Axios.get(`${config.base_url}/user/graylist/${this.props.msisdn}`)
    .then(res => {
      let data = res.data; 
      console.log(data);
      if(data){
        this.setState({data});
        if(data.subscription_status === "billed" || data.subscription_status === "trial" || data.subscription_status === "graced"){
          window.location.href = `${config.mainWebsiteUrl}/channel/${this.props.slug}?msisdn=${this.props.msisdn}`;
        }
      }
    })
    .catch(err => {
      console.log(err);
    })
    Axios.get(`${config.base_url}/package`)
    .then(res =>{
      console.log(res.data)
      let packageData = res.data;
      this.setState({
        package: packageData,
        packagePrice: packageData[1].display_price_point
      })
    })
  }

  render() {
    return (
        <div className="liveComponent">
            <img className="goonjLogo" src={require("../../assets/logoGoonj.png")} />
            <p className="liveText1">Watch psl live</p>
            <Box pkgPrice={this.state.packagePrice} msisdn={this.props.msisdn} slug={this.props.slug}/>
            <img className="teamsImg" src={require("../../assets/teams.png")} />
        </div>
    );
  }
}

export default PslComponent;
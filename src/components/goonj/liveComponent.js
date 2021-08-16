import React from 'react';
// import Axios from 'axios';
import  config  from '../../config/config';
import "./goonj.css";
import Box from './Box';
import PaywallInstance from '../../config/PaywallInstance';
// import { Logo } from '../../assets/logo.png'

class LiveComponent extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      data: [],
      packageID: 'QDfG',
      packageID1: 'QDfC',
      packageID2: 'QDfG',
      doubleConsent: false,
      packagePrice1: '',
      packagePrice2: '',
      packageDesc: ''
    }
  }
  componentDidMount(){
    PaywallInstance.get(`${config.base_url}/package?source=${this.props.source}&slug=live`)
    .then(res =>{
      let packageData = res.data;
      console.log(packageData[0]._id)
      this.setState({
        package: packageData,
        packagePrice1: packageData[0].display_price_point,
        packageID1: packageData[0]._id,
        packagePrice2: packageData[1].display_price_point,
        packageID2: packageData[1]._id,
        packageDesc: packageData[1].package_desc
      })
    })
  }

  render() {
    return (
        <div className="liveComponent">
          <div className="landing_page_background">
            <div className="liveContainer">
              <img className = "gLogo" src={require("../../assets/gla.png")} />
              <br />
              <h1 className = "aText1 aText1b">WATCH LIVE TV ANYTIME, ANYWHERE!</h1>
              {/* <p className = "aText3 lightFont aText3b">24hrs free trial for first time users</p> */}
                <Box packageID={this.state.packageID} packageID1={this.state.packageID1} packageID2={this.state.packageID2} pkgPrice1={this.state.packagePrice1} pkgPrice2={this.state.packagePrice2} msisdn={this.props.msisdn} slug={this.props.slug ? `channel/${this.props.slug}` : 'live-tv'} source={this.props.source}/>
              <div className="chargesBox lightFont">
                <p className="cbText1">
                <font color="#319fe7">{this.state.packageDesc}</font> Charges will be deducted from mobile balance
                </p>
                <p className="cbText2">
                  <font className="cancelText">for package conversion or cancellation, go to </font>Profile{">"}Subscriptions
                </p>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default LiveComponent;
import React from 'react';
import Axios from 'axios';
import  config  from '../../config/config';
import "./goonj.css";
import Box from './Box';
// import { Logo } from '../../assets/logo.png'

class LiveComponent extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      data: [],
      packageID: '',
      doubleConsent: false,
      packagePrice: ''
    }
  }
  componentDidMount(){
    Axios.get(`${config.base_url}/package?source=web`)
    .then(res =>{
      console.log(res.data)
      let packageData = res.data;
      this.setState({
        package: packageData,
        packagePrice: packageData[0].display_price_point,
        packageID: packageData[0]._id
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
              <p className = "aText3 lightFont aText3b">24hrs free trial for first time users</p>
                <Box packageID={this.state.packageID} pkgPrice={this.state.packagePrice} msisdn={this.props.msisdn} slug={this.props.slug}/>
              <div className="chargesBox lightFont">
                <p className="cbText1">
                  <font className="chargePP">Rs 5/day</font> daily charges after free trial
                  from mobile balance
                </p>
                <p className="cbText2">
                  <font className="cancelText">cancel anytime from </font>Account/settings
                </p>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default LiveComponent;
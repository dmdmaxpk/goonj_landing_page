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
      packageID: '',
      doubleConsent: false,
      packagePrice: ''
    }
  }
  componentDidMount(){
    Axios.get(`${config.base_url}/package`)
    .then(res =>{
      console.log(res.data)
      let packageData = res.data;
      this.setState({
        package: packageData,
        packagePrice: packageData[1].display_price_point,
        packageID: packageData[1]._id
      })
    })
  }

  render() {
    return (
        <div className="liveComponent">
            <img className="goonjLogo" src={require("../../assets/logoGoonj.png")} />
            <p className="liveText1">Watch psl live</p>
            <Box packageID={this.state.packageID} pkgPrice={this.state.packagePrice} msisdn={this.props.msisdn} slug={this.props.slug}/>
            <img className="teamsImg" src={require("../../assets/teams.png")} />
        </div>
    );
  }
}

export default PslComponent;
import React from 'react';
import Popup from "../components/popup/popup";

export default class  Landing extends React.Component {

  constructor(props){
    super(props);
    console.log(props);
    this.state = {
        showPopup: true
    };
  }

  routerLogic(){
      console.log("Press the router Logic button");
  }

  render() {
    var queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var msisdn = urlParams.get('msisdn');
    var src = urlParams.get('src');
    return (
        <div className="full_page_height">
            <div className="landing_page_background">
            {
                this.state.showPopup? <Popup msisdn={msisdn} src={src} />: null
            }
            </div>
        </div>
    );
  }
}

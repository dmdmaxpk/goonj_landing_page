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
    var mid = urlParams.get('mid');
    var unique_transaction_id = urlParams.get('tid');
    return (
        <div className="full_page_height">
            <div className="affiliateLandingBg">
              {/* <img className = "agLogo" src={require("../assets/gla.png")} />
              <br /> */}
              <h1 className = "aText1 zeroMB aText1sm">NA TV KI ZAROORAT AUR NA HE CABLE KI!</h1>
              <h1 className = "aText1 aText1a aText1sm">ABH <font color="#9ee132">Goonj</font> se Mobile bna tv!</h1>
              <br />
              <div className="channelLogosDiv">
                <img className="channelLogosImg" src={require("../assets/channelLogos/01.png")} />
                <img className="channelLogosImg" src={require("../assets/channelLogos/02.png")} />
                <img className="channelLogosImg" src={require("../assets/channelLogos/03.png")} />
                <img className="channelLogosImg" src={require("../assets/channelLogos/04.png")} />
                <img className="channelLogosImg" src={require("../assets/channelLogos/06.png")} />
                <br />
                <img className="channelLogosImg lastChannelImage" src={require("../assets/channelLogos/08.png")} />
                <img className="channelLogosImg lastChannelImage" src={require("../assets/channelLogos/09.png")} />
                <img className="channelLogosImg lastChannelImage" src={require("../assets/channelLogos/10.png")} />
              </div>
              <br />
              {/* <p className = "aText2 lightFont">and much more</p> */}

              {/* <p className = "aText3 lightFont">24hrs free trial for first time users</p> */}
            {
                this.state.showPopup? <Popup msisdn={msisdn} src={src} mid={mid} tid={unique_transaction_id} />: null
            }
              <div className="chargesBox lightFont">
                <p className="cbText1">
                  <font className="chargePP">Rs 5/day</font> Charges will be deducted from mobile balance
                </p>
                <p className="cbText2">
                  <font className="cancelText">for package conversion or cancellation, go to </font>Profile{">"}Subscriptions
                </p>
              </div>
            </div>
        </div>
    );
  }
}

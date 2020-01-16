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
    return (
        <div className="full_page_height">
            <div className="landing_page_background">
            {
                this.state.showPopup? <Popup></Popup>: null
            }
            </div>
        </div>
    );
  }
}

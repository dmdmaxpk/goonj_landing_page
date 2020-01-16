import React from 'react';
import { useParams } from 'react-router-dom';
// import { Logo } from '../../assets/logo.png'

export default class  Popup extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
        <div class="popup">
          <div class="popup_content">
            {/* <br /> */}
            <div class="">
              <img className="goonj_logo" src={require("../../assets/logo.png")} />
            </div>
            <div class="">
              <div className="popup_text_1">TO START YOUR FREE</div>
              <div className="popup_text_2">ONE DAY TRIAL CLICK ON</div>
              <div className="popup_text_3">SUBSCRIBE</div>
            </div>
            <div class="">
              <button className="button">
                <div style={{float: "left", marginLeft: "8%"}}>SUBSCRIBE NOW</div>
                <img src={require("../../assets/t-logo.png")} style={{float: "right", height: "20px", marginRight: "8%"}} />
              </button>
            </div>
          </div>
        </div>
    );
  }
}

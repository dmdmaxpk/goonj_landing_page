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
            <div class="popup_row_1">
              <img src={require("../../assets/logo.png")} />
            </div>
            <div class="popup_row_2">
              <p className="popup_text_1">TO START YOUR FREE</p>
              <p className="popup_text_2">ONE DAY TRIAL CLICK ON</p>
              <p className="popup_text_3">SUBSCRIBE</p>
            </div>
            <div class="popup_row_3">
              <button class="button">Subscribe</button>
            </div>
          </div>
        </div>
    );
  }
}

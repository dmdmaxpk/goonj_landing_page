import React from 'react';
import PslSubmit from '../../components/pslSubmit/pslSubmit';
import LiveComponent from '../../components/goonj/liveComponent';

export default class GoonjLive extends React.Component {

  constructor(props){
    super(props);
    console.log(props);
    this.state = {
        showPopup: true
    };
  }

  render() {
    var queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var channelID = urlParams.get('channelID');
    var slug = urlParams.get('slug');
    var msisdn = urlParams.get('msisdn');
    return (
        <div className="liveComponent">
            <div className="goonjLivePage">
                <LiveComponent msisdn={msisdn} channelID={channelID} slug={slug}/>
            </div>
        </div>
    );
  }
}

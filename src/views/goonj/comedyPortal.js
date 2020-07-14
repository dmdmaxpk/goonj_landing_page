import React from 'react';
import ComedyComponent from '../../components/goonj/comedyComponent';

export default class GoonjComedyPortal extends React.Component {

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
    var postUrl = urlParams.get('postUrl');
    var msisdn = urlParams.get('msisdn');
    var source = urlParams.get('source');
    return (
        <div className="liveComponent">
            <div className="goonjLivePage">
                <ComedyComponent msisdn={msisdn} postUrl={postUrl} source={source}/>
            </div>
        </div>
    );
  }
}

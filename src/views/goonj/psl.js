import React from 'react';
import PslSubmit from '../../components/pslSubmit/pslSubmit';
import PslComponent from '../../components/goonj/pslComponent';

export default class GoonjPsl extends React.Component {

  constructor(props){
    super(props);
    console.log("Props for PSL", props);
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
        <div className="full_page_height">
            <div className="goonjPslPage">
              <PslComponent msisdn={msisdn} channelID={channelID} slug={slug}/>
            </div>
        </div>
    );
  }
}

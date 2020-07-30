import React, { Component } from 'react';
import Axios from "axios";
import config from '../config/config'

class NoClickAff extends Component {
    constructor(props) {
        super(props);
        var queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        var msisdn = urlParams.get('msisdn');
        var source = urlParams.get('source');
        var src = urlParams.get('src');
        var mid = urlParams.get('mid');
        var tid = urlParams.get('tid');
        this.state = {
            data: [],
            packageId: 'QDfC',
            msisdn: msisdn,
            mid: mid,
            tid: tid,
            src: src,
            source: source
          }
          this.getPackage = this.getPackage.bind(this);
          this.subscribe = this.subscribe.bind(this);
        }
        componentDidMount(){
            this.getPackage();
            var {msisdn, src, mid, tid, packageId, source} = this.state;
            console.log(msisdn, src, mid, tid);
          // Pageview call
            Axios.get(`${config.base_url}/pageview?source=HE&msisdn=${msisdn}&mid=${mid}&tid=${tid}`)
            .then(res => {console.log("pageview response", res)})
            .catch(console.error());
        
            // Check User Status
            setTimeout(() => {
                if(msisdn.length > 1){
                    Axios.get(`${config.base_url}/user/graylist/${msisdn}?source=HE&package_id=${packageId}&mid=${mid}&tid=${tid}`)
                    .then(res => {
                        let data = res.data;
                        // Event("Count", "Load", "Landing");
                        if(data){
                            this.setState({data});
                            if(data.subscription_status === "billed" || data.subscription_status === "trial" || data.subscription_status === "graced"){
                            // Event("Count", "Load", "Already Subscribed");
                                window.location.href = `${config.mainWebsiteUrl}/live-tv?msisdn=${msisdn}&package_id=${packageId}`;
                            }
                            else if(data.subscription_status === "expired" || data.subscription_status === "not_billed" || data.is_gray_listed === true){
                                this.props.history.push(`/goonjLive?msisdn=${msisdn}&source=${source ? source : "web"}`)
                            }
                            else if(data.code === 6){
                                this.subscribe()
                            }
                            else{
                                this.props.history.push(`/goonjLive?msisdn=${msisdn}&source=${source ? source : "web"}`)
                            }
                        }
                        else{
                            this.props.history.push(`/goonjLive?msisdn=${msisdn}&source=${source ? source : "web"}`)
                        }
                    })
                    .catch(err => {
                    console.log(err);
                    })
                }
            }, 1000);
        }
        getPackage(){
            Axios.get(`${config.base_url}/package?source=HE`)
            .then(res =>{
            let packageData = res.data[0];
            this.setState({
                packageId: packageData._id
            })
            })
        }
        subscribe(){ 
          var {msisdn, src, mid, tid, packageId} = this.state;
          const userData = {
            msisdn: msisdn,
            package_id: packageId,
            source: "HE",
            marketing_source: mid,
            affiliate_unique_transaction_id: tid,
            affiliate_mid: mid
      
          }
          // console.log('user', userData);
          Axios.post(`${config.base_url}/payment/subscribe`, userData)
          .then(res =>{
            if(res.data.code === -1){
              this.setState({loading: false});
            //   alert(res.data.message);
                console.log("in here");
                window.location.href = `${config.mainWebsiteUrl}/home?msisdn=${msisdn}`
            }
            else {
                window.location.href = `${config.mainWebsiteUrl}/live-tv?msisdn=${msisdn}&package_id=${res.data.package_id}`
          }
          })
          .catch(err =>{
            console.log(err);
            alert("Something went wrong! :(");
          })
        }
    render(){
        return(
            <div>

            </div>
        );
    }
}
 
export default NoClickAff;
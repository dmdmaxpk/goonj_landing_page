import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import './App.css';
import Landing from "./views/landing";
import PslLanding from "./views/psl/pslLanding";
import GoonjPsl from "./views/goonj/psl";
import GoonjLive from "./views/goonj/live";
import GoonjComedyPortal from './views/goonj/comedyPortal';

import {PageView, initGA} from './components/Tracking';
import ConfirmSub from './views/goonj/confirmSub';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import GDNTwo from './views/gdnTwo';
import NoClickAff from './views/noClickAff';

class App extends React.Component{

componentDidMount(){
  initGA('UA-69091505-12');
  PageView();


  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let UrlAccessToken = urlParams.get("access_token");
  let UrlRefreshToken = urlParams.get("refresh_token");

  if(UrlAccessToken){
    localStorage.setItem('accessToken', UrlAccessToken);
  }
  if(UrlRefreshToken){
    localStorage.setItem('refreshToken', UrlRefreshToken);
  }
}
render(){
  return (
    <BrowserRouter>
      <div id="app-div" className="full_page_height">
        <Route exact path="/" component={Landing} ></Route>
        <Route exact path="/gdnTwo" component={GDNTwo} ></Route>
        <Route exact path="/psl" component={PslLanding} ></Route>
        <Route exact path="/goonjLive" component={GoonjLive} ></Route>
        <Route exact path="/goonjComedyPortal" component={GoonjComedyPortal} ></Route>
        <Route exact path="/confirmSubscription" component={ConfirmSub} ></Route>
        <Route exact path="/gdn2-confirmSubscription" component={ConfirmSub} ></Route>
        <Route exact path="/noClickAffiliate" component={NoClickAff} ></Route>
        {/* <Route exact path="/goonjPsl" component={GoonjPsl} ></Route> */}
      </div>
    </BrowserRouter>
  );
}  
}

export default App;

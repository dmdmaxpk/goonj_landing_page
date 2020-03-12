import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import './App.css';
import Landing from "./views/landing";
import PslLanding from "./views/psl/pslLanding";
import GoonjPsl from "./views/goonj/psl";
import GoonjLive from "./views/goonj/live";

import {PageView, initGA} from './components/Tracking';

class App extends React.Component{

componentDidMount(){
  initGA('UA-69091505-12');
  PageView();
}
render(){
  return (
    <BrowserRouter>
      <div id="app-div" className="full_page_height">
        <Route exact path="/" component={Landing} ></Route>
        <Route exact path="/psl" component={PslLanding} ></Route>
        <Route exact path="/goonjPsl" component={GoonjPsl} ></Route>
        <Route exact path="/goonjLive" component={GoonjLive} ></Route>
      </div>
    </BrowserRouter>
  );
}  
}

export default App;

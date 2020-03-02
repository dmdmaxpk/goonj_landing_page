import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import './App.css';
import Landing from "./views/landing";
import PslLanding from "./views/psl/pslLanding";

function App() {
  return (
    <BrowserRouter>
      <div id="app-div" className="full_page_height">
        <Route exact path="/" component={Landing} ></Route>
        {/* <Route exact path="/psl" component={PslLanding} ></Route> */}
      </div>
    </BrowserRouter>
  );
}

export default App;

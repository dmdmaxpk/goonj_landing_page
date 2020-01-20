import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import './App.css';
import Landing from "./views/landing";

function App() {
  return (
    <BrowserRouter>
      <div id="app-div" className="full_page_height">
        <Route path="/:msisdn" component={Landing} ></Route>
      </div>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import {useState, useEffect} from "react";

import Navigation from "./Navigation";
import Home from "./Home";
import Create from "./Create";
import TherapySession from "./TherapySession";
import FindOne from "./FindOne"
import Sessions from "./SearchSessions"


import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default function App() {
 

  return (

    <Router>
      <div >
        <div className="nav">
      <h1 className="title">Take A Seat Therapy :(</h1>  
      <Navigation /> 
      
    </div>
      <div className="whatsthis"></div>
     
      <div className="space">
        {/* Route links are in navbar file */}
        <Routes>  
           <Route exact path="/" element={<Home />} />
           <Route exact path="TherapySession" element={<TherapySession />} />
           <Route exact path="create" element={<Create />} />
           <Route exact path="FindOne" element={<FindOne />} /> 
           <Route exact path="SearchSessions" element={<Sessions />} /> 
         </Routes>
        </div>
      </div>
    </Router>       
  );
}


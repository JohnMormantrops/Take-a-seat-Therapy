import React from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Link } from "react-router-dom";

export default function() {
 
  return (
    <div>
        <ol >
          <Link to="/" className="links" >
            Home
          </Link>
          <Link to="/Create" className="links" >
            New Client
          </Link> 
          <Link to="/FindOne" className="links" >
            Search Client
          </Link>
          <Link to="/TherapySession" className="links" >
            Therapy Sessions
          </Link>
          <Link to="/SearchSessions" className="links" >
            Search Sessions
          </Link> 
          
        </ol>
    </div>
  );
}
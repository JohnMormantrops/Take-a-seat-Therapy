import React from "react";
import {useState, useEffect} from "react";
import Axios from "axios";

export default function({session}){


    const updateSesh =()=> {
        console.log("updating")
        console.log(sesh._id)
       
        Axios.patch("http://localhost:3001/updateSesh", {
            id : sesh._id,
            session : sesh,
        });
    }

    console.log(session)
    const [sesh, setSesh] =  useState(session[0])

    console.log("SESH")
    console.log(sesh)
    console.log(sesh.Fee)
    return(
        <div>
            <h3>UPDATE SESSION</h3>

        <label>Fee</label><br/>
         <input type="text"
          value={sesh.Fee}
          onChange={(event)=> {
          setSesh({...sesh, Fee:event.target.value});
         }} /><br/>
          <label>Date</label><br/>
         <input type="text"
          value={sesh.SessionDate}
          onChange={(event)=> {
          setSesh({...sesh, SessionDate:event.target.value});
         }} /><br/>
          <label>Session Notes</label><br/>
         <textarea type="text"
          onChange={(event)=> {
          setSesh({...sesh, SessionNotes:event.target.value});
         }} /><br/>
         <button onClick={() => updateSesh()}>UPDATE SESSION</button>
        


        </div>
    )


}
import React from "react";
import {useState, useEffect} from "react";
import './App.css';
import Axios from 'axios';
import { BrowserRouter as Router, Link } from "react-router-dom";
import UpdateSesh from "./UpdateSession"


export default function(){

    const [message, setMessage] = useState("");
    const [Sessions, setSessions] = useState([])
    const [SessionNumber, setSessionNumber] = useState("")
    const [FirstName, setFirstName] = useState(""); 
    const [Surname, setSurname] = useState("");
    const [found, setFound] = useState(false);

    useEffect(()=> {
        const fetchSessions = async() =>{
          const res = await Axios.get("http://localhost:3001/seeSessions", {
          });
          setSessions(res.data)
        }       
        fetchSessions();
      }, []);

    console.log("SEARCHING FOR SESIOINS")   
    console.log(Sessions)
    
    const fetchSession= async()=>{
        console.log("clicked")
        setSessions([])
        const res = await Axios.get("http://localhost:3001/seeOneSession", {params: { SessionNumber: SessionNumber }});
     
        if(res.data === 'No session found'){
            setMessage(res.data)
            const res = await Axios.get("http://localhost:3001/seeSessions", {
          });
          setSessions(res.data)
        }else{
            setFound(true)
            setSessions([res.data])
        }

    }

    const deleteSesh =async(sesh)=>{
        console.log("DELETING")
        try{
            const res = await Axios.delete("http://localhost:3001/deleteSesh", {params: { id: sesh}})
            console.log(res)
            setMessage("Session Deleted")
        }catch(error){
            setMessage("error occured?")
        }
        const res = await Axios.get("http://localhost:3001/seeSessions", {
          });
          setSessions(res.data)
    }

    

    return(
        <div>
        <h2>All Sessions</h2>
        {message}<br/>
          <input type="number"
         placeholder="Session number"
          value={SessionNumber}
          onChange={(event)=> {
            setSessionNumber(event.target.value);
         }} /><br/>
       <button onClick={()=>{fetchSession()}}>SEARCH SESSION</button>

         {Sessions.map((session, key) => (
              
             <div className="row">
                 {console.log("In the map")}
               {console.log(session._id)}
                 <p><h4>SESSION <b>{session.SessionNumber}</b></h4>
                 Date: {session.SessionDate}<br/>
                 Time: {session.SessionTime}<br/>
                 Attendance: {session.SessionAttendance}<br/>
                 Type: {session.SessionType}<br/>
                 Fee: £{session.Fee}<br/>
                 </p>
                <hr/>           
                 <p><h4>Attended By</h4>
                 Therapist: {session.Therapist[0].Title} {session.Therapist[0].Surname}
                 {session.Clients.map((c)=>(
                 <div>Client: {c.Title} {c.Surname}</div>
                 ))}
                 </p>
                 <hr/>
                 <p><h4>NOTES</h4>
                {session.SessionNotes}
                 </p>   
                 <button onClick={()=> deleteSesh(session._id)}>Remove Session</button>             
            </div>      
         ))}

        {found && <UpdateSesh session={Sessions} />}
        </div>
    )
}
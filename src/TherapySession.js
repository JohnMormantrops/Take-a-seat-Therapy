
import React from "react";
import {useState, useEffect} from "react";
import Axios from "axios";
import './App.css';
import SeeClients from "./FindOne";

export default function(){

    // let newDate = new Date();
    // console.log(newDate);
    const [currentSession, setCurrentSession] = useState([]);

    const [message, setMessage] = useState("");
    const [users, setUsers] = useState([]);
    const [FirstName, setFirstName] = useState("");
    const [Surname, setSurname] = useState("");
    const [Email, setEmail] = useState("")

    const [SessionDate, setSessionDate] = useState("");
    const [SessionTime, setSessionTime]= useState("");
    const [Clients, setClients] = useState([]);
    const [Therapist, setTherapist] = useState([]);
    const [Fee, setFee] = useState(100);
    const [SessionNumber, setSessionNumber] = useState("");
    const [SessionAttendance, setSessionAttendance] = useState("Attended")
    const [SessionType, setSessionType] = useState("Intake");
    const [SessionNotes , setSessionNotes] = useState("nothing noted");
  

    const searchUser = async(Type) =>{
        
        console.log("searching") 
        console.log(FirstName)
        console.log(Surname)
        console.log(Email)

        const res = await Axios.get("http://localhost:3001/seeOneUser", {params: {FirstName: FirstName, Surname: Surname, Type: Type} });
        setUsers(res.data)
    }

    const getSessionNumber=(number)=>{
        console.log("Session number?")
        setSessionNumber(number)
        console.log(number)
        const checkSession =async(number)=>{
                    const res = await Axios.get("http://localhost:3001/seeOneSession", {params: {SessionNumber: number} });
                    setCurrentSession(res.data)
        }
        checkSession(number)
     
    }
    
    useEffect(() => {
            if(currentSession.SessionNumber>0){
                console.log("ANYTHING?")
                setSessionDate(currentSession.SessionDate)
                setSessionTime(currentSession.SessionTime)
                setClients(currentSession.Clients)
                setTherapist(currentSession.Therapist)
                setFee(currentSession.Fee)
                setSessionNumber(currentSession.SessionNumber)
                setSessionAttendance(currentSession.SessionAttendance)
                setSessionType(currentSession.SessionType)
                setSessionNotes(currentSession.SessionNotes)
    }
    }, [currentSession])
 

    if(currentSession){
        console.log("FOUND A SESSION")
        console.log(currentSession.Fee)
    }else{ 
        console.log("No session")
    	}

    console.log("currentSession")
    console.log(currentSession)

     const addSession =async()=> {
    
        const result = await Axios.post("http://localhost:3001/createSession", {
            SessionDate : SessionDate , 
            SessionTime: SessionTime,
            Clients:  Clients,
            Therapist: Therapist,
            Fee: Fee,
            SessionNumber: SessionNumber,
            SessionAttendance: SessionAttendance,
            SessionType: SessionType,
            SessionNotes:SessionNotes,  
        });
        setMessage(result.data)
        //console.log(result)
    }

    const addToSession=(user)=> {
        console.log("ADDING TO SESSION")
        console.log(user)
        if(user.Type== "Therapist"){
            console.log("THERAPIST")
            if(Therapist.length<1){
                console.log("GREATER")
                setTherapist((Therapist) => [...Therapist, user]);
            }
            
        }else{
            console.log("Client")
            if(Clients.length < 4){
               setClients((Clients) => [...Clients, user]); 
            }        
        }

    }

    
    console.log("THERAPIST")
    console.log(Therapist)
    console.log("Client")
    console.log(Clients)

    return(
        <div>
         <h2>Manage Therapy Session</h2>
         <h3 style={{color: "red"}}>{message}</h3>
        
        { currentSession.SessionNumber>0 && <h4>Session Found with Session Number {currentSession.SessionNumber} Update current session or choose a different Session number</h4>}
        
        <div className="row">
        <form>
            <h5>Session Information</h5>

            <label>Session Number</label><br/>
             <input type="number"
                required
                value={SessionNumber}
                onChange={(event)=> {
                    getSessionNumber(event.target.value);
            }} /><br/>
            <label>Date and Time Of Session</label><br/>
            <input 
                required
                type="date"     
                onChange={(event)=> {
                    setSessionDate(event.target.value);
            }} /><br/>
                
            <input 
                required
                type="time"     
                onChange={(event)=> {
                    setSessionTime(event.target.value);
            }} /><br/>
           
            <label>Fee</label><br/>
            <input type="number"
                required
                value={Fee}
                onChange={(event)=> {
                    setFee(event.target.value);
            }} /><br/>
           

            <label>Session Attendance</label><br/>
                <select 
                    value={SessionAttendance} 
                    required
                    onChange={(e) => setSessionAttendance(e.target.value)}
                    >
                    <option value="Attended">Attended</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="No Show">No Show</option>  
            </select><br/>

            <label>SessionType</label><br/>
                <select 
                    value={SessionType} 
                    required
                    onChange={(e) => setSessionType(e.target.value)}
                    >
                    <option value="Intake">Intake</option>
                    <option value="Psycotherapy">Psycotherapy</option>
                    <option value="Assesment">Assesment</option>
                    <option value="Other">Other</option>  
            </select><br/>
            
            <label>SessionNotes</label><br/>
            <textarea
                required
                value={SessionNotes}
                onChange={(e) => setSessionNotes(e.target.value)}
            ></textarea>
       </form>
     
        <hr/>
            
        <div>
        <h5>Manage Participants</h5>
        {Therapist.length>0 && <div>Therapist {Therapist[0].Title} {Therapist[0].Surname} {Therapist.Surname}</div>}
       {Clients.length>0 && Clients.map((client)=> (<div>Client: {client.Title} {client.Surname}</div>))}
       <br/>
        <label>Add Therapist</label><br/>
        
        <input type="text"
         placeholder="FirstName"
         value={FirstName}
          onChange={(event)=> {
            setFirstName(event.target.value);
         }} /> <br/>  
         <input type="text"
         placeholder="Surname"
          value={Surname}
          onChange={(event)=> {
            setSurname(event.target.value);
         }} /><br/>
         <button onClick={()=>{searchUser("Therapist")}}>SEARCH THERAPIST</button><br/>

        <label>Add Client</label><br/>
        <input type="text"
         placeholder="FirstName"
         value={FirstName}
          onChange={(event)=> {
            setFirstName(event.target.value);
         }} />   <br/>
         <input type="text"
         placeholder="Surname"
          value={Surname}
          onChange={(event)=> {
            setSurname(event.target.value);
         }} /><br/>
       <button onClick={()=>{searchUser("Client")}}>SEARCH CLIENT</button>
         </div>
       
         <hr/>

        <div className="">
        {users.map((user, key) => (  
            <div>       
               <p>
               <b>{user.Type}</b><br/>
               {user.Title}<br/>
               {user.FirstName},<br/>
               {user.Surname},<br/>
               {user.Email}</p>    
               <button onClick={() => addToSession(user)}>ADD TO SESSION</button>                   
            </div> 
        ))}

       </div>
      


    </div>{/* END OF ROW */}
    <button onClick={() => addSession()}>CONFIRM SESSION</button>
       
       <h3>USER INFORMATION</h3>
       <SeeClients />
    </div>
    )
}
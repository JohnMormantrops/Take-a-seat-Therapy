import React from "react";
import {useState, useEffect} from "react";
import Axios from "axios";
import './App.css';


export default function ({user})  {
    
    console.log("UPDATER THE USER")
    console.log(user.Address[0].AddressLine1)

   const [message, setMessage] = useState("")

    const [Title, setTitle] = useState(user.Title)
    const [Phone, setPhone] = useState(user.Phone)
    const [Email, setEmail] = useState(user.Email)
    const [Guardian, setGuardian] = useState(user.Guardian)
    const [MaritalStatus, setMaritalStatus] = useState(user.MaritalStatus)
    const [Permission, setPermission] = useState(user.Permission) 
    const [address, setAddress] = useState({
        AddressLine1: user.Address[0].AddressLine1,
        AddressLine2: user.Address[0].AddressLine2,
        Town: user.Address[0].Town,
        CountyCity: user.Address[0].CountyCity,
        Eircode: user.Address[0].Eircode,
    }) 


    const updateUser =()=>{
        console.log("adding user")
        console.log(user._id)
        console.log(address)

        Axios.patch("http://localhost:3001/updateUser", {
            id : user._id,
            user :{
            Title: Title,
            Phone: Phone,
            Email: Email, 
            Guardian: Guardian,
            MaritalStatus: MaritalStatus,
            Permission, Permission,
            Address: address,
            }
        });
        setMessage("updated")
    }
    
    return(
        <div >
        <h2>update user</h2>
        <h4>{message}</h4>
        <div className="row">
        <div>
        <label>Title</label><br/>
         <input type="text"
         value={Title}
              onChange={(event)=> {
            setTitle(event.target.value);
         }} /><br/>

         <label>Phone</label><br/>
         <input type="text"
         value={Phone}
          onChange={(event)=> {
            setPhone(event.target.value);
         }} /><br/>

         <label>Email</label><br/>
         <input type="text"
         value={Email}
          onChange={(event)=> {
            setEmail(event.target.value);
         }} /><br/>

         <label>Guardian</label><br/>
         <input type="text"
         value={Guardian}
          onChange={(event)=> {
            setGuardian(event.target.value);
         }} /><br/>
         
         <label>MaritalStatus</label><br/>
         <input type="text"
         value={MaritalStatus}
          onChange={(event)=> {
            setMaritalStatus(event.target.value);
         }} /><br/>
         
         <label>Permission</label><br/>
         <input type="text"
         value={Permission}
          onChange={(event)=> {
            setPermission(event.target.value);
         }} /><br/>
         </div>
         <hr/>
         <div>
         <label>AddressLine1</label><br/>
         <input type="text"
         value={address.AddressLine1}
          onChange={(event)=> {
            setAddress({...address, AddressLine1 : event.target.value});
         }} /><br/>
         <label>AddressLine2</label><br/>
         <input type="text"
         value={address.AddressLine2}
          onChange={(event)=> {
            setAddress({...address, AddressLine2 : event.target.value});
         }} /><br/>
         <label>Town</label><br/>
         <input type="text"
         value={address.Town}
          onChange={(event)=> {
            setAddress({...address, Town : event.target.value});
         }} /><br/>
         <label>CountyCity</label><br/>
         <input type="text"
         value={address.CountyCity}
          onChange={(event)=> {
            setAddress({...address, CountyCity : event.target.value});
         }} /><br/>
         <label>Eircode</label><br/>
         <input type="text"
          value={address.Eircode}
          onChange={(event)=> {
            setAddress({...address, Eircode : event.target.value});
         }} /><br/>
         </div>
         <button onClick={()=>{updateUser()}}>UPDATE</button>
        </div>
       </div>
    );
};
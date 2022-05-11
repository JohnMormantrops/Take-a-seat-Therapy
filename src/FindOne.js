import React from "react";
import {useState, useEffect} from "react";
import './App.css';
import Axios from 'axios';
import { BrowserRouter as Router, Link } from "react-router-dom";
import UpdateUser from "./UpdateUser";



export default function(){

    const [message, setMessage] = useState("");
   const [users, setUsers] = useState([]);
   const [FirstName, setFirstName] = useState(""); 
   const [Surname, setSurname] = useState("");
   const [found, setFound] = useState(false);

   console.log(found)
   

    useEffect(()=> {
        const fetchUsers = async() =>{
          const res = await Axios.get("http://localhost:3001/seeUsers", {
          });
          setUsers(res.data)
        }       
        fetchUsers();
      }, []);

      const deleteUser = async(user)=>{
        console.log("Deleting");
        console.log(user._id);
        try{
            const res = await Axios.delete("http://localhost:3001/delete", {params: { id: user._id}})
            //console.log(res)
            setMessage("User Deleted")
            const re = await Axios.get("http://localhost:3001/seeUsers", {
            });
            setUsers(re.data)
        }catch(error){
            setMessage("error occured?")
        }
       
    }
 
    const searchUser = async() =>{
        console.log("searching") 
        console.log(FirstName)
        console.log(Surname)
        const res = await Axios.get("http://localhost:3001/seeOneUser", {params: {FirstName: FirstName, Surname: Surname} });
        if(res.data==0){
            setMessage("not found")
            const res = await Axios.get("http://localhost:3001/seeUsers", {
          });
          setUsers(res.data)
        }else{
            setUsers(res.data)
            setFound(true)
        }
        
    }

     // console.log(users)

    return (
        <div>
            <h2>SEARCH AND UPDATE USERS</h2>
            <h3>{message}</h3>

            <input type="text"
         placeholder="FirstName"
         value={FirstName}
          onChange={(event)=> {
            setFirstName(event.target.value);
         }} />
         <label></label>
         <input type="text"
         placeholder="Surname"
          value={Surname}
          onChange={(event)=> {
            setSurname(event.target.value);
         }} />

       <button onClick={()=>{searchUser()}}>SEARCH</button>
            

            {users.map((user, key) => (
                <div className="row">

                <div><p>
                <b>{user.Type}</b><br/>
                {user.Gender}<br/>
                {user.Title}<br/>
                {user.FirstName},<br/>
                {user.Surname},<br/>
                {user.Phone}<br/>
                {user.Email}</p>                       
               </div>
            
               <div>
               <p><b>Details</b><br/>
               {user.Guardian}<br/>
               {user.MaritalStatus},<br/>
               Permission to contact: {user.Permission}<br/>
               Reffered by: {user.Referer}<br/>
               Date Created<br/>
               {user.newDate.substring(0, 15)}</p>  
               </div> 
               <button className="del" onClick={()=> deleteUser(user)}>DELETE USER</button>                    
              </div>

            ))}
            {found && <UpdateUser user={users[0]} />}
        </div>
       
    )
}
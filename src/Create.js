
import React from "react";
import {useState, useEffect} from "react";
import Axios from "axios";


export default function(){

    // let newDate = new Date();
    // console.log(newDate);

    const [message, setMessage] = useState("");
   
    const [Title, setTitle] = useState("Mx.");
    const [Type, setType]= useState("Client");
    const [FirstName, setFirstName] = useState("");
    const [Surname, setSurname] = useState("");
    const [Phone, setPhone] = useState("");
    const [Email, setEmail] = useState("");
    const [address, setAddress] = useState({
        Type : "",
        AddressLine1: "",
        AddressLine2:"",
        Town: "",
        CountyCity:"",
        Eircode: "",
    })
    const [Dob, setDob] = useState("");
    const [Guardian , setGuardian] = useState("");
    const [Permission, setPermission] = useState("Yes");
    const [Gender, setGender] = useState("Male");
    const [MaritalStatus, setMaritalStatus] = useState("Never Married");
    const [Referer, setReferer] = useState("");
    const [newDate, setNewDate] = useState("");


    useEffect(() => {
        let newdate = new Date().toString();
            setNewDate(newdate);
    })

    

   
     const addUser =async()=> {
        console.log("adding user")
        console.log(address)    

        const result = await Axios.post("http://localhost:3001/createUser", {
            Title: Title,
            Type: Type,
            FirstName:  FirstName,
            Surname: Surname,
            Phone: Phone,
            Email: Email, 
            Address: address,
            Dob : Dob,
            Guardian: Guardian,
            Permission: Permission,
            Gender: Gender,
            MaritalStatus: MaritalStatus,
            Referer: Referer,
            newDate, newDate,
        });
        setMessage(result.data)
        console.log(result)
    }

    return(
        <div >
         <h2>Create User</h2>
         
        <form>
   
        <h3 style={{color: "red"}}>{message}</h3>
        <div className="row">
        <div>
          <h5>USER DETAILS</h5>
        <label>Title</label><br/>
        <select 
            value={Title} 
            onChange={(e) => setTitle(e.target.value)}
            >
            <option value="Mr.">Mr.</option>
            <option value="Mrs.">Mrs.</option>
            <option value="Ms.">Ms.</option>
            <option value="Miss">Miss</option>
            <option value="Dr.">Dr.</option>      
        </select>
        <select 
            value={Type} 
            onChange={(e) => setType(e.target.value)}
            >
            <option value="Client">Client</option>
            <option value="Therapist">Therapist</option>     
        </select>     
      <br/>


         <label>FirstName</label><br/>
         <input type="text"
          required
          onChange={(event)=> {
          setFirstName(event.target.value);
         }} /><br/>
         <label>Surname</label><br/>
         <input type="text"
          required
          onChange={(event)=> {
          setSurname(event.target.value);
         }} /><br/>
         <label>Phone</label><br/>
         <input type="text"
          required
          onChange={(event)=> {
          setPhone(event.target.value);
         }} /><br/>
         <label>Email</label><br/>
         <input type="email"
          required
          onChange={(event)=> {
          setEmail(event.target.value);
         }} /><br/>
         </div>
         <hr/>


         <div>
          <h5>Home Address</h5>
         <label>AddressLine1</label><br/>
         <input type="text"
         required
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
          required
         value={address.Town}
          onChange={(event)=> {
            setAddress({...address, Town : event.target.value});
         }} /><br/>
         <label>CountyCity</label><br/>
         <input type="text"
          required
         value={address.CountyCity}
          onChange={(event)=> {
            setAddress({...address, CountyCity : event.target.value});
         }} /><br/>
         <label>Eircode</label><br/>
         <input type="text"
          required
          value={address.Eircode}
          onChange={(event)=> {
            setAddress({...address, Eircode : event.target.value});
         }} /><br/>
         </div> 

         <hr/>
         <div>
        <h5>Additional Details</h5>
        <label>Date Of Birth</label><br/>
         <input type="date"
          required
         value={Dob}
          onChange={(event)=> {
            setDob(event.target.value);
         }} /><br/> 
         
         <label>Parent/Guardian name</label><br/>
         <input type="text"
          placeholder="Only if under 18"
         value={Guardian}
          onChange={(event)=> {
            setGuardian(event.target.value);
         }} /><br/>
        <label>Permission to contact?</label><br/>
        <select 
            value={Permission} 
            required
            onChange={(e) => setPermission(e.target.value)}
            >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
        </select><br/>
        <label>Gender</label><br/>
        <select 
            value={Gender} 
            required
            onChange={(e) => setGender(e.target.value)}
            >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Prefer not to say">Prefer not to say</option>  
        </select><br/>

        <label>Marital Status</label><br/>
        <select 
            value={MaritalStatus} 
            required
            onChange={(e) => setMaritalStatus(e.target.value)}
            >
            <option value="Never Married">Never Married</option>
            <option value="Domestic Partnership">Domestic Partnership</option>
            <option value="Married">Married</option>
            <option value="Seperated">Seperated</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
            <option value="Prefer not to say">Prefer not to say</option>  
        </select><br/>
       

         <label>Referer</label><br/>
         <input type="text"
          required
         value={Referer}
          onChange={(event)=> {
            setReferer(event.target.value);
         }} /><br/>
        <button onClick={() => addUser()}>ADD USER</button>
        </div>
        </div>
       </form>
    </div>
    )
}
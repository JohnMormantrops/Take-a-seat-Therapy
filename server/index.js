const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const SessionModel = require("./models/session")
const UserModel = require("./models/users")
const { useHref } = require('react-router-dom')
app.use(express.json())
app.use(cors())

const uri = "mongodb+srv://Johnny:college123@cluster0.rh3cw.mongodb.net/Therapy?retryWrites=true&w=majority";

mongoose.connect(uri, {
     useNewUrlParser: true,
})


app.get("/seeUsers", async(req, res) => {
    UserModel.find({}, (err, result) =>{
        if(err){
            res.send(err)
        }
        res.send(result)
    })
});

app.get("/seeOneUser", async(req, res) => {
    console.log("seeing one user")
    console.log(req.query)
    const user = await UserModel.find(req.query)
    console.log(user)
    res.send(user)
});

app.get("/seeSessions", async(req, res) => {
    console.log("seeing one user")
    console.log(req.query)
    const session = await SessionModel.find(req.query)
    console.log(session)
    res.send(session)
});

app.get("/seeOneSession", async(req, res) => {
    console.log("seeing SESSION")
    console.log(req.query)
    const session = await SessionModel.findOne(req.query)
    console.log(session===null)
    if(session===null){
        res.send("No session found")
    }else{
        res.send(session)
    }
   
});



app.post("/createUser", async (req, res) => {
    console.log("CREATING")
    const model = req.body
    console.log(model)
    const user = new UserModel(model)
    try{
        await user.save();
        res.send("added")      
    }catch(err){
        console.log(err)
        res.send("Fill all fields");
    }
});

app.post("/createSession", async (req, res) => {
    console.log("CREATING")
    const model = req.body
    console.log(model)
    const Session = new SessionModel(model)
    try{
        await Session.save();
        res.send("Added Session")      
    }catch(err){
        console.log(err)
        res.send("Fill all fields");
    }
});

app.delete("/delete", async(req, res) => {
    console.log("deleting")
    console.log(req.query.id)
    try{
        const result = await UserModel.deleteOne({_id: req.query.id})
        res.send("DELETED")
    }
    catch(error){
        console.log("error")
    }
   
})
app.delete("/deleteSesh", async(req, res) => {
    console.log("deleting")
    console.log(req.query.id)
    try{
        const result = await SessionModel.deleteOne({id: req.query.id})
        console.log(result)
        res.send("DELETED")
    }
    catch(error){
        console.log("OH NOO")
    }
   
})

app.get("/seeOneUser", async(req, res) => {
    console.log("seeing one user")
    console.log(req.query)
    const user = await UserModel.find(req.query)
    console.log(user) 
    res.send(user)
});

app.patch('/updateUser', async function (req, res, next) {
    console.log("PUTTING")
    // console.log(req)

    console.log(req.body.id)
    const id = req.body.id  
    console.log(req.body.user)
    user = req.body.user
    const fields = {};
    for(const key in user){
        if(user[key] === ""){
            continue
        }else{
            console.log(key + " " + user[key])
            fields[key] = user[key];
        }       
    }
    for(const key in user){
        if(user[key] === ""){
            continue
        }else{
            console.log(key + " " + user[key])
            fields[key] = user[key];
        }       
    }

    await UserModel.updateOne({_id: id}, {$set: fields})
    const found = await UserModel.findOne({ _id :id})
    console.log("FOUND")
    console.log(found)
    res.send("done");
});

app.patch('/updateSesh', async function (req, res, next) {
    console.log("PUTTING")
    // console.log(req)

    console.log(req.body.id)
    const id = req.body.id  
    console.log(req.body.session)
    session = req.body.session
    
    await SessionModel.updateOne({_id: id}, {$set: session })
    const found = await sessionModel.findOne({ _id :id})
    console.log("FOUND")
    console.log(found)
    res.send("done");
});
























/////////////////
//////////////PHONE STUFF
/////////////


app.post("/insert", async (req, res) => {
    console.log("inserting phone")
    console.log(req.url)
    console.log(req.body)
    const model = req.body.model
    const phone = new PhoneModel(model)
    try{
        await phone.save();
    }catch(err){
        console.log(err)
    }
});




app.patch('/addOrder', async function (req, res, next) {
    console.log("PUTTING")
    // console.log(req)

    console.log(req.body.id)
    const id = req.body.id  
    console.log(req.body.phone)
    phone = req.body
   
    console.log("USER name")
    try{
         await UserModel.updateOne({_id: id},{
        $push: {Orders: phone }
    })
    }catch(error){
        console.log("oh daear")
    }
});


app.patch('/updateUser', async function (req, res, next) {
    console.log("PUTTING")
    // console.log(req)

    console.log(req.body.id)
    const id = req.body.id  
    console.log(req.body.user)
    user = req.body.user
    const fields = {};
    for(const key in user){
        if(user[key] === ""){
            continue
        }else{
            console.log(key + " " + user[key])
            fields[key] = user[key];
        }       
    }
    for(const key in user){
        if(user[key] === ""){
            continue
        }else{
            console.log(key + " " + user[key])
            fields[key] = user[key];
        }       
    }

    await UserModel.updateOne({_id: id}, {$set: fields})
    const found = await UserModel.findOne({ _id :id})
    console.log("FOUND")
    console.log(found)
    res.send("done");
});




app.listen(3001, ()=>{
    console.log("server running on port 3001")
})
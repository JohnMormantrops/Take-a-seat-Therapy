const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const PhoneModel = require("./models/phones")
const UserModel = require("./models/users")
const { useHref } = require('react-router-dom')
app.use(express.json())
app.use(cors())

const uri = "mongodb+srv://Johnny:college123@cluster0.rh3cw.mongodb.net/Phones?retryWrites=true&w=majority";

mongoose.connect(uri, {
     useNewUrlParser: true,
})
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


app.get("/seePhones", async(req, res) => {
    PhoneModel.find({}, (err, result) =>{
        if(err){
            res.send(err)
        }
        res.send(result)
    })
});

app.post("/seeOrders", async(req, res)=> {
    console.log("finding orders")
    console.log(req.body.id);
    try{
    const response = await UserModel.findOne({_id: req.body.id}, 'Orders')
    console.log(response.Orders);
    res.send(response.Orders)
    }catch(error){
        console.log(error)
    }
     
   
})

app.patch("/removeOrder", async(req, res)=>{
   console.log("Remove order")
   console.log(req.body.orders)
    console.log(req.body.phoneId)
   // _id:req.body.userId,
    // const result = await UserModel.find({ _id:req.body.userId})
    // console.log("RESULT")   
    // console.log(result);
    const check = await UserModel.updateOne({ _id : req.body.userId}, {"Orders" : req.body.orders}, { upsert: true });
    console.log("CHECK")   
    console.log(check);
    res.send("done")
})

app.get("/seeOneUser", async(req, res) => {
    console.log("seeing one user")
    console.log(req.query)
    const user = await UserModel.find(req.query)
    console.log(user)
    res.send(user)
});


app.get("/seeUsers", async(req, res) => {
    console.log("seeing users")
    //pass 1 search term ,
    // PhoneModel.find({$where: {model: "samsung"}})
    UserModel.find({}, (err, result) =>{
        if(err){
            res.send(err)
        }
        res.send(result)
    })
});

app.delete("/delete", async(req, res) => {
    console.log("deleting")
    console.log(req.query.id)
    try{
        const result = await UserModel.deleteOne({_id: req.query.id})
        res.send("DELETED")
    }
    catch(error){
        console.log("OH NOO")
    }
   
})



app.listen(3001, ()=>{
    console.log("server running on port 3001")
})
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
        Title: {
            type: String,
            required: true,
        },
        Type: {
            type: String,
            required: true,
        },
        FirstName: {
            type: String,
            required: true,
        },
        Surname: {
            type: String,
            required: true,
        },
        Phone: {
            type: String,
            required: true,
        },
        Email: {
            type: String,
            required: true,
           
        // trim: true,
        // lowercase: true,
        // unique: true,
        // required: 'Email address is required',
        // validate: [validateEmail, 'Please fill a valid email address'],
        // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        Address: [       
            {
            AddressLine1: {
                type: String,
                required: true,
            },
            AddressLine2:String,
            Town:  {
                type: String,
                required: true,
            },
            CountyCity: {
                type: String,
                required: true,
            },
            Eircode:  {
                type: String,
                required: true,
            },
        }], 
        Dob: {
            type: Date,
            required: true, 
        },
        Guardian: {
            type: String,
        },
        Permission:{
            type: String,
            required: true,
        },
        Gender: {
            type: String,
            required: true,
        },
        MaritalStatus:{
            type: String,
            required: true,
        },
        Referer: {
            type: String,
            required: true,
        },
        newDate:{
            type: String,
            required: true,
        }


}, { strict: false })

// model: {
//     type: String,
//     required: true,
// }

//pass name of collection = AllPhones and scheam
const User = mongoose.model("User", UserSchema)
module.exports = User;
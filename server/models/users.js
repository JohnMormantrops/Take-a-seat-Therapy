const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
        Title: {
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
        AddressShip: [       
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
        Orders: []
}, { strict: false })

// model: {
//     type: String,
//     required: true,
// }

//pass name of collection = AllPhones and scheam
const User = mongoose.model("User", UserSchema)
module.exports = User;
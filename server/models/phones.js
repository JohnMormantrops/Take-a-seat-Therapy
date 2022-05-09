const mongoose = require('mongoose')

const PhoneSchema = new mongoose.Schema({

    manufacturer: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
})

// model: {
//     type: String,
//     required: true,
// }

//pass name of collection = AllPhones and scheam
const Phone = mongoose.model("allphones", PhoneSchema)
module.exports = Phone;
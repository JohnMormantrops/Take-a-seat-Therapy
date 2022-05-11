const mongoose = require('mongoose')

const SessionSchema = new mongoose.Schema({

    SessionDate: {
        type: String,
        required: true,
    },
    SessionTime: {
        type: String,
        required: true,
    },
    Clients: {type:[], required:true},
    Therapist:  {type:[], required:true},
    Fee: {
        type: String,
        required: true,
    },
    SessionNumber: {      
            type: Number,
            unique: true,
            required: true,
    },
    SessionAttendance: {      
            type: String,
            required: true,
    },
    SessionType: {      
        type: String,
        required: true,
    },
    SessionNotes: {      
        type: String,
        required: true,
    },
})

// model: {
//     type: String,
//     required: true,
// }

//pass name of collection = AllPhones and scheam
const Session = mongoose.model("Sessions", SessionSchema)
module.exports = Session;
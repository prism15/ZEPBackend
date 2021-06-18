const mongoose = require('mongoose');


const conn = mongoose.connection;



const roomSchema = new mongoose.Schema({
    image : String,
    roomNumber : Number,
    description : String,
    charges : Number,
    startDate : String,
    status : String,
    Type : String,
    BookingStatus : String,
    uploaded : {type : Date, default : Date.now}
})

const room = mongoose.model("Room",roomSchema);
module.exports = room;
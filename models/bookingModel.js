const mongoose = require('mongoose');
// try{
//     mongoose.connect('mongodb+srv://Pixel:Jerry@cluster0.pvepn.mongodb.net/ZEPRoomBooking?retryWrites=true&w=majority&&ssl=true',{
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     },(error,res)=>{
//         if(res){
//             console.log("Booking Model Connected...")
//         }
//         else{
//             console.log("this is main error",error)
//         }
//     })
// }catch(err){
//     console.log('could not connect')
// }



const bookingSchema = new mongoose.Schema({
    Name: String,
    Phone : Number,
    documentName : String,
    documentNumber : String,
    startDate : Date,
    endDate : Date,
    Amount : Number,
    roomid: String,
    roomNumber : Number,
    status : String,
    BookingStatus : String,
    
});

const booking = mongoose.model("Booking",bookingSchema);
module.exports = booking;

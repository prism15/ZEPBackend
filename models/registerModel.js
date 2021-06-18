const mongoose = require('mongoose');
// try{
//     mongoose.connect('mongodb+srv://Pixel:Jerry@cluster0.pvepn.mongodb.net/ZEPRoomBooking?retryWrites=true&w=majority&&ssl=true',{
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     },(error,res)=>{
//         if(res){
//             console.log("Register Model Connected Connected...")
//         }
//         else{
//             console.log("this is main error",error)
//         }
//     })
// }catch(err){
//     console.log('could not connect')
// }

const adminSchema = new mongoose.Schema({
    firstname : String,
    lastname : String,
    email : String,
    password : String
})
//you changed from Admin to admins and also url is changed
const admin = mongoose.model("Admin",adminSchema);
module.exports = admin;
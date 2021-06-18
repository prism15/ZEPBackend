const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const cors = require('cors');
const registerRoute = require('./routes/registerRoute')
const loginRoute =  require('./routes/loginRoute')
const roomRoute = require('./routes/roomRoute')
const bookingRoute = require('./routes/bookingRoute');
const upload = require('./controllers/roomController');
const mongoose = require('mongoose');




const app = express()
app.use(bodyParser.json());

app.use(cors())
app.use('/images',express.static('images'));

let corsOptions = {
    origin : 'http://localhost:4200'
}

app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods','GET , POST , PUT , PATCH , DELETE , OPTIONS');
    res.setHeader('Access-Control-Allow-Header','X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

app.use('/signup',registerRoute);
app.use('/login',loginRoute);
app.use('/addRoom',roomRoute);
app.use('/Notification',roomRoute);
app.use('/bookroom',bookingRoute);
app.use('/Currentbookings',roomRoute);
app.use('/History',roomRoute);
app.use('/currentbookings', roomRoute);

const port = process.env.PORT || 3000;
app.listen(port,async()=>{
    //actual_url=mongodb://Pixel:Jerry@cluster0-shard-00-00.pvepn.mongodb.net:27017,cluster0-shard-00-01.pvepn.mongodb.net:27017,cluster0-shard-00-02.pvepn.mongodb.net:27017/ZEPRoomBooking?ssl=true&replicaSet=atlas-kz0nn2-shard-0&authSource=admin&retryWrites=true&w=majority
    await mongoose.connect('mongodb://Pixel:Jerry@cluster0-shard-00-00.pvepn.mongodb.net:27017,cluster0-shard-00-01.pvepn.mongodb.net:27017,cluster0-shard-00-02.pvepn.mongodb.net:27017/ZEPRoomBooking?ssl=true&replicaSet=atlas-kz0nn2-shard-0&authSource=admin&retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex : true,
        useFindAndModify : true
    },(error,res)=>{
        if(res){
            console.log("Room Model Connected...")
        }
        else{
            console.log("this is main error",error)
        }
    })
    console.log("Server started on port 3000...");
})

module.exports = {
    app, 
};
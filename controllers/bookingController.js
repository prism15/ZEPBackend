const express = require('express');
const booking = require('../models/bookingModel');
const room = require ('../models/roomModel');

//Used to book rooms
//Add User id field Here for personal history at user end
module.exports.bookroom = async(req,res)=>{

    try{
        const{
            Name : Name,
            Phone : Phone,
            documentName:documentName,
            documentNumber:documentNumber,
            startDate:startDate,
            endDate:endDate,
            Amount:Amount,
            roomid : roomid,//Object id for MongoDB
            roomNumber : roomNumber,//For Hotel room no
            status : status 
        }= req.body;
        
        // let demodate = new Date(startDate);
        // let demo1 = demodate.toDateString();
        // console.log("this is the type of start date", typeof(demo1));

        room.updateMany({_id : roomid},{$set : {status : status , startDate : startDate}},(err,result)=>{
            if(err)
            {
                console.log("this caused error",err);
            }else{
                console.log(result);
            }
        })
    
        let Booking = new booking({
            Name,
            Phone,
            documentName,
            documentNumber,
            startDate,
            endDate,
            Amount,
            roomid,
            roomNumber,
            status
        });
    
        await Booking.save((error,Booking)=>{
            if(error){
                console.log(error);
            }else{
                res.json(Booking);
            }
        })
    }catch(err){
        console.log("Error to get Book Room:-",err)
    }
   
}
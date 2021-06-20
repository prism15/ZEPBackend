const express = require('express');
const room = require('../models/roomModel');
const booking = require('../models/bookingModel')
const multer = require('multer');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const { nextTick } = require('process');




module.exports.addRoom =  (req,res)=>{
  try{
    let message = "Room added successfully."
    const url = req.protocol+'://'+req.get("host"); 
    console.log(url);
    const {
      roomNumber : roomNumber,
      Type : Type,
      description : description,
      charges : charges
    }= req.body
  
  
    let Room = new room({
      roomNumber,
      Type,
      description,
      charges,
      image : url + "/images/"+req.file.filename,
      status : "Available"
    });
    Room.save((error,Room)=>{
      if(error)
      {
        console.log(error);
      }else{
        res.json(Room);
      }
    })
  }catch(err){
    console.log("Error while adding Room",err)
  }  
}

module.exports.getRoom = async (req,res)=>{
  try{
    let Room = await room.find({
      $or : [
        {status : "Available"},
        {status : "pre-booked"}
      ]
    })
    //console.log("These rooms are being sent", Room);
    res.json({room:Room});
  }catch(err){
    console.log("Error while getting all the rooms:-",err)
  }
    
}

//this displays rooms in CurrentBookings Page
module.exports.getBookedRooms = async( req,res)=>{

  try{
    let date = new Date();
    let bookingDate = date.getDate();
    let VacantRoom = await booking.find({
      $and : [
        {endDate : {$gte : date}},
        {
          $or : [
            {status : "Booked"},
            {status : "pre-booked"}
        ]}
      ]
    })
    res.json({vacantroom: VacantRoom});
  }catch(err){
    console.log("Error to get Booked rooms",err)
  }
    
      
}

//We need to add booking cancled , or early left or successfully completed
module.exports.getHistory = async(req,res)=>{
  console.log("in history funcion.............");
  try{
    let date = new Date();
    let currentDate = date.getDate();
    console.log(currentDate);
    //finding rooms where endDate is less than or equal to today's date
    let History = await booking.find({
      $or : [
        {endDate : {$lte : date}},
        {status : {$eq : "Available" }}
      ]
    });
    console.log("this is history in backend",History);
    res.json({history : History});
  }catch(err){
    console.log("error while getting History",err);
  }
  
}

module.exports.makeVacant = async (req,res)=>{
  
  try{
    const {
    id : id 
  } = req.body;
  console.log("roomid in backend",id);
  let bookings = await booking.findOne({
    $and : [
      {roomid : id},
      {
        $or : [
          {status : "Booked"},
          {status : "pre-booked"}
        ]
      }
    ]
  });
  console.log("bookings are found to be..",bookings)
  let bookingstatus;
  let date = new Date();
  let time = date.getHours()
  if(bookings.startDate>date){
    bookingstatus = "RoomCancelled"
  }if(bookings.startDate == date && time<11){
    bookingstatus = "RoomCancelled"
  }
  if(bookings.startDate == date && time >= 11)
  {
    bookingstatus = "RoomBooked"
  }
  if((date > bookings.startDate && date<bookings.endDate) || date == bookings.endDate)
  {
    bookingstatus = "RoomBooked"
  }
  let vacant = await booking.updateMany({_id : bookings._id },{$set : {status  : "Available",BookingStatus : bookingstatus}});
  let Available =  await room.updateOne({_id : id} , {$set : {status : "Available" , startDate : "null"}})
  }catch(err){
    console.log("Error to make room vacant",err)
  }
  
  
   
  //   console.log("Tis is docs in available",docs);
  // }).catch((error)=>{
  //   console.log(error)
  // })
}
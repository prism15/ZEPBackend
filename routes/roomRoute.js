const express = require('express');
const multer = require('multer');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const path = require('path');
const methodOverride = require('method-override');
const GridFsStorage = require('multer-gridfs-storage');
const router = express.Router();
const addRoom = require('../controllers/roomController');
const conn = require('../models/roomModel')
const upload = require('../controllers/roomController');

const MIME_TYPE_MAP={
    'image/png':'png',
    'image/jpeg':'jpg',
    'image/jpg':'jpg'
}

// let gfs;
// conn.once("open", () => {
//   // init stream
//   gfs = new mongoose.mongo.GridFSBucket(conn.db, {
//     bucketName: "uploads"
//   });
// });

const storage = multer.diskStorage ({
  // url : "mongodb://localhost:27017/admindb",
  // file : (req,file)=>{
    
  //   return new Promise((resolve,reject)=>{
  //     crypto.randomBytes(16,(err,buff)=>{
  //       if(err)
  //       {
  //         return reject(err);
  //       }
  //       const filename = buff.toString('hex')+path.extname(file.originalname);
  //       // const name = file.originalname.toLowerCase().split(' ').join('-');
  //       // const ext = MIME_TYPE_MAP[file.mimetype];
  //       // const filename = name + '-'+'.'+ext;
  //       const fileinfo = {
  //       filename : filename,
  //       bucketName : 'rooms'
  //       };
  //       resolve(fileinfo);
  //     });
  //   });
  // }
    destination : (req, file , cb)=>{
      
      const isValid = MIME_TYPE_MAP[file.mimetype]
      let error = new Error("Invalid MimeType");
      if(isValid)
      {
        error = null;
      }
      cb(error, "images/");
    },
    filename:(req,file,cb)=>{
      const name = file.originalname.toLowerCase().split(' ').join('-');//spliting blank spaces in name and joining them with -
      const ext = MIME_TYPE_MAP[file.mimetype];//this will give us the mime type of the file
      cb(null,name);
    }
});
  

//router.post('/',addRoom.uploadFile);
router.post('/',multer({storage : storage }).single("image"),addRoom.addRoom);

router.get('/',addRoom.getRoom)
router.get('/booked',addRoom.getBookedRooms);
router.get('/history', addRoom.getHistory);
router.post('/makevacant',addRoom.makeVacant);

module.exports = router;
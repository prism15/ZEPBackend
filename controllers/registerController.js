const admin = require('../models/registerModel')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const register = (req,res)=>{
    const  {
        firstname:firstname,
        lastname:lastname, 
        email:email,
        password:password
    } = req.body
    
     bcrypt.hash(password,saltRounds,async function(err,password){
        if(err)
        {
            console.log(err);
        }
        else{
            let Admin = new admin({firstname,lastname,email,password});
            await Admin.save((error,Admin)=>{
                if(error){
                    console.log(error);
                }else{
                    res.json(Admin)
                    
                }
            })
        }
    })
}




module.exports = {
    register,
    
} 
const express = require('express');
const jwt = require('jsonwebtoken');
const admin = require('../models/registerModel');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized Request');
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null')
    {
        return res.status(401).send('Unauthorized Request');
    }
    let payload = jwt.verify(token , 'secretKey')
    if(!payload)
    {
        return res.status(401).send('Unauthorized Request');
    }
    req.userId= payload.subject
    next()
}

const login = (req,res)=>{
    console.log("I am in log innnnn");
    
    const{
        email:email,
        password:password
    }= req.body;
    console.log("this is email",email)
    message = "Failed to login"
    admin.findOne({email:email},function(error,foundUser){
        console.log("error before if",error);
        console.log('this is user',foundUser);
        if(error)
        {
            console.log(error);
             res.json(error);
        }
        else
        {
            console.log(foundUser);
            if(foundUser)
            {
                
                bcrypt.compare(password,foundUser.password,function(err,result){
                    if(err)
                    {
                        console.log("this is error",err);
                        res.json(err);
                    }
                    else{
                        if(result)
                        {
                            let payload = {subject : foundUser._id}
                            let token = jwt.sign(payload,'secretkey');
                            res.send({token});
                            //console.log(token);
                            console.log('Access granted');
                        }
                        else{
                            res.json('error')
                        }
                    }
                })
            }else{
                res.json(message)
            }
        }
    })
    
}

module.exports = {
    login
}
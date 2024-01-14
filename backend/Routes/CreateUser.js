const express=  require('express');
const router=express.Router();
const User= require('../models/User')
const {body , validationResult}=require('express-validator')
const bcrypt = require('bcryptjs');
const jwtToken=require('jsonwebtoken');
const SECRET_KEY="qR7p9sF2vX5cN1mL8jK0hZ3bG6aD4eY7"
 


router.post('/createuser',[body('email',"Incorrect email").isEmail(),
  body('password',"Incorrect Password").isLength({min:5}),
body('name',"Incorrect name").isLength({min:5})], async(req,res)=>{
    const error= validationResult(req);
    if(!error.isEmpty()) {
        return res.send({status:400,
        error:error.array()})


    }
  try {
    const { name,email,password,location}=req.body;

    const salt = await bcrypt.genSalt(10);
    const securePassword=await bcrypt.hash(password,salt)

    await User.create({
        name:name,
        location:location,
        email:email,
        password:securePassword,
       
        
        
      })
      res.json({success:true})
  } catch (error) {
    
     console.log(error)
     res.json({success:false})
  }
})

router.post("/loginuser",[body('email',"Incorrect email").isEmail(),
body('password',"Incorrect Password").isLength({min:5})],async(req,res)=>{
    const error= validationResult(req);
   
    if(!error.isEmpty()) {
        return res.send({status:400,
        error:error.array()})
    }
        const{email,password}=req.body;
       try{
        const userDb=await User.findOne({email})
        const pwdCompare = await bcrypt.compare(req.body.password,userDb.password)
        if(!userDb){
          return  res.send({
                status:404,
                message:"user not found",
                error:"user is not present"
            })


        }
        else if(!pwdCompare){
           return res.send({
                status:401,
                message:"Authorization failed",
                error:"Password is incorrect"
            })
        }

        const data={
            user:{
                id:userDb.id,
                email:userDb.email
            }
        }

        const authToken= await jwtToken.sign(data,SECRET_KEY)
       
          return  res.send({
                status:200,
                message:"Login successful",
                authToken:authToken
               
            })
       
       }
    catch (error) {
       return  res.send({
            status:500,
            message:"DB error",
            error:error
        })
    }
})

module.exports= router;
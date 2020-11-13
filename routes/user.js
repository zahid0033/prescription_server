const express = require('express');
const router = express.Router();
const User = require('../model/user');
// const Joi = require('@hapi/joi');
// const {userSchema} = require('../validation')

// const schema = {
//     name: Joi.string().min(6).required(),
//     email: Joi.string().min(6).required().email(),
//     password: Joi.string().min(6).required()
// };


router.get('/',(req,res)=> {
    res.send({message : "hello"})
})

router.post('/',async (req,res) => {
    try{
        const result = await userSchema.validateAsync(req.body)
        // console.log(result)
        // if(error) return res.status(400).send(error.details[0])

        const userSave = new User({
            name : result.name,
            email : result.email,
            password : result.password,
        })

        console.log("done")
        const user  = await userSave.save();
        res.send(user)
    }catch (error) {
        console.log("erorr")
        console.log("erorr",error)
        // console.log(error.isJoi)
    }
})
module.exports = router
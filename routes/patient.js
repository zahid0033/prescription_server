const express = require('express');
const router = express.Router();
const Patient = require('../model/patient')

router.get('/', async (req,res) => {
    try{
        const patient =  await Patient.find();
        res.json(patient)
    } catch (err) {
        return next(err);
    }
})

router.post('/register', async (req,res) => {
    try {
        const patient = await new Patient(req.body);
        patient.save();
        res.json({ success: true, message: "Patient created successfully" });
    } catch (error) {
        console.log("err",error);
        res.json(error.message);
    }
})
module.exports = router;
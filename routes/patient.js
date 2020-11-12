const express = require('express');
const router = express.Router();
const Patient = require('../model/patient');
const Admission = require('../model/admission');
const Encounter = require('../model/encounters');

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

router.get('/details/:patientId', async (req,res) => {
    try{
        const patient =  await Patient.findById(req.params.patientId);
        res.json(patient)
    } catch (err) {
        return next(err);
    }
})

router.get('/admission/:patientId',async (req,res) => {
    try{
        const admission = await Admission.find({patient_id: req.params.patientId});
        res.json(admission)
    } catch (err) {
        console.log(err)
    }
})

router.post('/admission/register',async (req,res) => {
    try{
        const admission = await new Admission(req.body);
        admission.save();
        res.json({success:true, message: "admission done successfully"})
    } catch (err) {
        console.log(err)
    }
})
module.exports = router;
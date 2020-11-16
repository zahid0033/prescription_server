const express = require('express');
const router = express.Router();
const Patient = require('../model/patient');
const Admission = require('../model/admission');
const Encounter = require('../model/encounters');
const Doctor = require('../model/doctor')

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
        const admission = await Admission.find({patient_id: req.params.patientId}).sort({join_date:-1});
        res.json(admission)
    } catch (err) {
        console.log(err)
    }
})

router.get('/admission/details/:admissionId',async(req,res) => {
    try{
        const admission = await Admission.findById(req.params.admissionId);
        res.json(admission)
    } catch (err) {
        console.log(err)
    }
})

router.post('/admission/register',async (req,res) => {
    const doctor = await Doctor.findById(req.body.doctor_id)
    const data = {
        patient_id: req.body.patient_id,
        doctor_id: doctor,
        join_date: req.body.join_date
    }
    try{
        const admission = await new Admission(data);
        admission.save();
        res.json({success:true, message: "admission done successfully"})
    } catch (err) {
        console.log(err)
    }
})

router.post('encounter/register',async(req,res) => {
    try{
        const encounter = await new Encounter(req.body);
        encounter.save();
        res.json({success:true, message: "Encounter done successfully"})
    }
    catch (e) {
        console.log(e)
    }
})
module.exports = router;
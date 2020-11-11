const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
       type: String,
       required: true
    },
    sex: {
        type: String,
        required: true
    },
    marital_status: {
        type: String,
        required: true
    },
    blood_group: {
        type: String
    },
    birthDate: {
        type: String
    },
    age: {
        type: Number,
        default: 0,
    }
});

module.exports = mongoose.model("Patient", PatientSchema);
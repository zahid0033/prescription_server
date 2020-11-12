const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdmissionSchema = new Schema({
    patient_id: {
        type: String,
        required: true
    },
    doctor_id: {
        type: String,
        required: true
    },
    join_date: {
        type: String,
        required: true
    },
    release_date: {
        type: String,
        required: true
    },
    encounters: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Encounter"
        }
    ]
});

module.exports = mongoose.model("Admission", AdmissionSchema);
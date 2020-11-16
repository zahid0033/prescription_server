const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdmissionSchema = new Schema({
    patient_id: {
        type: String,
        required: true
    },
    doctor_id: {},
    join_date: {
        type: Date
    },
    release_date: {
        type: Date
    },
    encounters: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Encounter"
        }
    ]
});

module.exports = mongoose.model("Admission", AdmissionSchema);
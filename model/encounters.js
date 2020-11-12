const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EncounterSchema = new Schema({
    patient_id: {
        type: String,
        required: true
    },
    doctor_id: {
        type: String,
        required: true
    },
    chief_complaint: {
        type: String
    },
    on_examination: {
        type: String
    },
    drug: {
        type: String
    },
    advice: {
        type: String
    },
    suggestion: {
        type: String
    },
    admission: { type: Schema.Types.ObjectId, ref: 'Admission'}
});

module.exports = mongoose.model("Encounter", EncounterSchema);
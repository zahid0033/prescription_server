const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true
    },
});

DoctorSchema.pre("save", async  function (next) {
    const user = this;
    //Hash the password with a salt round of 10, the higher the rounds the more secure, but the slower
    //your application becomes.
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

DoctorSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
};

module.exports = mongoose.model("Doctor", DoctorSchema);
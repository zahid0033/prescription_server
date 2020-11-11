const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const userRoute = require('./routes/user');
const doctorRoute = require('./routes/doctor');
const patientRoute = require('./routes/patient');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
require('./auth/auth');

mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false },()=> {
    console.log("Connected to Mongodb")
})

const app = express();
app.use(express.static(path.join(__dirname,'public')))


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use('/api',doctorRoute);
app.use('/api/patient',patientRoute);
// app.get('/',function (req,res) {
//     res.send('Hello World');
// })

app.listen(port,function () {
    console.log(`server running on port ${port}`)
})
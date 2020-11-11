const express = require('express');
const passport = require("passport");
const router = express.Router();
const User = require('../model/user');
const Doctor = require('../model/doctor');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const {userSchema} = require('../validation');
const validateRegisterInput = require('../validation/registration');
const validateLoginInput = require('../validation/login')


router.post("/register", async (req, res, next) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return next(errors);
    }
    passport.authenticate("register", async (err, user, info) => {
        try {
            if (err || !user) {
                console.log(info);
                return res.status(400).json(info);
            }
            return res.json({
                id: user.id,
                name: user.name,
                email: user.email,
                type: "student",
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

router.post("/login", async (req, res, next) => {
    const { errors, isValid } = validateLoginInput(req.body); // Check validation
    if (!isValid) {
        return next(errors);
    }
    passport.authenticate("login", async (err, user, info) => {
        try {
            if (err || !user) {
                return res.status(400).json(info);
            }
            req.login(user, { session: false }, async (error) => {
                if (error) return next(error);
                //We don't want to store the sensitive information such as the
                //user password in the token so we pick only the email and id
                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    type: "student",
                }; // Sign token
                const token = jwt.sign(payload, process.env.secretKey, {
                    expiresIn: 2678400 /* 1 month in seconds*/,
                });
                return res.json({ success: true, token: token });
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

module.exports = router
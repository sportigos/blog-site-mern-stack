//  Begin Date: 2020/05/24  Sun
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keys = require("../config/keys");
const User = require("../models/user");
const signUpValid = require("../validation/signUp");
const signInValid = require("../validation/signIn");

exports.signUp = async function(req, res) {
    var { errors, isValid } = signUpValid(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    await User.findOne({ email: req.body.email })
        .then(result => {
            if(result) {
                errors.email = "The user with that email already exist.";
                return res.status(400).json(errors);
            } else {
                new User(req.body)
                    .save()
                    .then(result_2 => {
                        res.json(result_2);
                    })
                    .catch(err => {
                        errors.dbErr = "Sorry. Server side error occured. Please try again.";
                        return res.status(500).json(errors);
                    });
            }
        })
        .catch(err => {
            errors.dbErr = "Sorry. Server side error occured. Please try again.";
            return res.status(500).json(errors);
        });
}

exports.signIn = async function(req, res) {
    var { errors, isValid } = signInValid(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    
    var email = req.body.email,
        password = req.body.password;
    await User.findOne({ email })
        .then(async user => {
            if(!user) {
                errors.email = "The user with that email is not registered.";
                return res.status(404).json(errors);
            }

            await bcrypt.compare(password, user.password)
                .then(async isMatch => {
                    if(isMatch) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            role: user.role
                        };

                        await User.findByIdAndUpdate(
                                user._id,
                                { $set: { 
                                    signed_count: user.signed_count+1,
                                    last_signed_at: new Date()
                                } }
                            )
                            .then(result => {
                                jwt.sign(
                                    payload,
                                    keys.secretOrKey,
                                    { expiresIn: 3600 },
                                    (err, token) => {
                                        res.json({
                                            success: true,
                                            token: "Bearer" + token
                                        });
                                    }
                                );
                            })
                            .catch(err => {
                                errors.dbErr = "Sorry. DB error occured. Please try again.";
                                return res.status(500).json(errors);
                            });
                                
                    } else {
                        errors.password = "Password incorrect";
                        return res.status(400).json(errors);
                    }
            });
        })
        .catch(err => {
            errors.dbErr = "Sorry. Server side error occured. Please try again.";
            return res.status(500).json(errors);
        });
} 
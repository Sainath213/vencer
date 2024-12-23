const express=require('express');
const zod=require('zod');
const jwt=require('jsonwebtoken');

const { User }=require('../models/User.js');


const loginSchema = zod.object({
    emailOrUserName: zod.string().min(3), 
    password: zod.string().min(8),
});

const loginValid = async (req, res, next) => {
    const { success, error } = loginSchema.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            message: "Invalid input",
            errors: error.errors,
        });
    }

    try {
        
        const isEmail = req.body.emailOrUserName.includes('@');
        const user = await User.findOne({
            [isEmail ? 'email' : 'userName']: req.body.emailOrUserName,
        });

        if (!user) {
            return res.status(404).json({
                message: "User doesn't exist",
            });
        }

        if (req.body.password !== user.password) {
            return res.status(401).json({
                message: "Incorrect password",
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
            },
            "vencer"
        );
        res.json({
            token: token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error",
        });
        return;
    }
};

module.exports = loginValid;
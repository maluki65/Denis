const User = require("../Models/userModel");
const createError = require("../utils/appError");
const bcrypt = require ("bcrypt");
const jwt = require("jsonwebtoken");

//On registering new users
exports.signup = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            return next (new createError("User with email already exits!", 400));
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        
        const newUser = await User.create({
            ...req.body,
            password: hashedPassword,
        });

        // On jwt Token generation
        const token = jwt.sign({_id:newUser._id}, "secretkey123", {
            expiresIn: "7d",
        });

        res.status(201).json({
            status: "success",
            message: "User registered sucessfully",
            token,
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        });

    } catch (error) {
        next(error);
    }
};


//On user logging in
exports.login = async (req, res, next) => {
    try {
        const { email, password} = req.body;

        const user = await User.findOne({email});

        if (!user) return next(new createError("User does not exist!", 404));

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return next (new createError("Invalid passord or email", 401));
        }

        const token = jwt.sign({ id: user._id}, "secretkey123",{
            expiresIn: "7d",
        });

        res.status(200).json({
            status: "status",
            message: "User Logged In sucessufully",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error){
        next(error);
    }
};
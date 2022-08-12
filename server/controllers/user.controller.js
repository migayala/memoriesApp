const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
SECRET = process.env.JWT_SECRET

const register= async (req, res) => {
    try {
        const user = new User(req.body);
        const newUser= await user.save();
        // console.log('NEW USER', newUser);
        const userToken = jwt.sign
        // console.log(userToken)
        ({
            _id: newUser._id,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName
        },
            SECRET,
        );
            res.status(201).cookie('userToken', userToken, 
            {
                httpOnly: true,
                expires: new Date(Date.now() + 900000)
            })
            .json({successMessage: 'user created', user : {
                _id: newUser._id,
                email: newUser.email,
                password: newUser.password,
                firstName: newUser.firstName,
                lastName: newUser.lastName
            }
        });
    } catch (err){
        // console.log('====registration err', err)
        res.status(400).json(err)
    }
}

const login = async(req, res) => {
    const userDoc = await User.findOne({email: req.body.email});
    if (!userDoc){
        res.status(400).json({message: 'Invalid Email/Password'})
    }
    else {
        try{
            const isPasswordValid = await bcrypt.compare(req.body.password, userDoc.password)
            if(!isPasswordValid){
                res.status(400).json({message: 'Invalid Email/Password'});
            } else {
                const userToken = jwt.sign
                    ({
                        _id: userDoc._id,
                        email: userDoc.email,
                        firstName: userDoc.firstName,
                        lastName: userDoc.lastName
                    },
                    SECRET,
                );
                    res.status(201).cookie('userToken', userToken, {
                        httpOnly: true,
                        // expires: new Date(Date.now()+ 900000)
                        expiresIn: '5h'
                    })
                    .json({successMessage: 'User logged in', user : {
                        _id: userDoc._id,
                        email: userDoc.email,
                        password: userDoc.password,
                        firstName: userDoc.firstName,
                        lastName: userDoc.lastName
                    }
                });
            }
        } catch (err){
            // console.log(err)
            res.status(400).json({message: 'Invalid Email/Password'})
        }
    }
};

const logout = (req, res) =>{
    // console.log("logging out");
    res.clearCookie("userToken");
    res.json({
        message:"You have successfully logged out!"
    })
}

const getLoggedInUser = async (req, res) =>{
    try{   
        const userPayload = jwt.verify(req.cookies.userToken, SECRET)
        const user = await User.findOne({_id : userPayload._id});
        // console.log(user)
        res.json(user);
    } catch(err){
        // console.log(err);
        res.status(400).json({err})
    }
};

module.exports = {
    register,
    login,
    logout,
    getLoggedInUser
}
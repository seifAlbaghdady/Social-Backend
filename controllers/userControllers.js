const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bycrypt = require('bcrypt');
require('dotenv').config();

const getAllUsers = async (req, res) => {
    let users = await User.find();
    if(users) return res.status(200).json(users);
    else return res.status(400).json({message: 'No users found'});
}

const SignUp = async (req, res) => {
    const{name, email, password} = req.body;
    exist = await User.findOne({email:email});
    //exist = null;
    if(exist) return res.status(400).json({message: 'User already exists'});
    else{
        const hashedPassword = await bycrypt.hash(password, 10);

        let user = new User({
            name:name,
            email:email,
            password:hashedPassword
        });

        await user.save();
        return res.status(200).json({message: 'User created'});
    }
}

const Login = async (req, res) => {
    const{email, password} = req.body;
    exist = await User.find({email:email});
    if(!exist) return res.status(400).json({message: 'Sign Up first'});
    else{
        if(bycrypt.compare(password, exist.password)){
            token = jwt.sign({id:exist._id}, process.env.TOKEN_SECRET, {expiresIn: '1h'});
            return res.status(200).json({message: 'Login successful' , token:token});
        }
        else{
            return res.status(400).json({message: 'Incorrect password'});
        }
    }
}

module.exports = {getAllUsers,SignUp,Login};
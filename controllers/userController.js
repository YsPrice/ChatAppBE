const bcrypt = require('bcrypt');
const User = require("../Models/User");
const { generateToken } = require('../utils/jwtUtils');

exports.createUser = async (req,res) => {
    const {email, username,password} = req.body;
    
    try{
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await User.create({
            email,
            username,
            password:hashedPassword
        });
        res.status(201).json({
            message:'User successfully created!',
            user:{
                id: newUser.id,
                email: newUser.email,
                username: newUser.username
            }
        });


    }catch(error){
        res.status(500).json({
            message:'something went wrong, user not created!',
            error:error.message
        })
    }
}

exports.userLogin = async (req,res) => {
const { email, password } = req.body;
try{
const user = await User.findOne({
    where:{
    email,
    }
});
if(!user){
return res.status(404).json({
    message:'user not found'
})

}
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch){
    return res.status(401).json({message:'invalid credentials'});
}

const token = generateToken(user);
res.json({
    message:'login successful!',
    token:token
})
}catch(error){
    res.status(500).json({
        message:'login unsuccessful!',
        error:error.message
    })
}

};


exports.deleteUser = async (req,res) =>{
try{
   const {email, password} = req.body
const user = await User.findOne({
    where: {email} 
})
if(!user){
    return res.status(404).json({message:'User not found'});
}  
const isMatch = await bcrypt.compare(password, user.password);
if(!isMatch){
    return res.status(401).json({message:'Incorrect password'})
}
await User.destroy({
    where:{
        id: user.id
    }
});
res.status(200).json({message:'User account deleted successfully.'})
} catch(error){
    res.status(500),json({
        message:' NANI?! Failed to delete account!',
        error:error.message
    })
}
}
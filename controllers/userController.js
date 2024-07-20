const bcrypt = require('bcrypt');
const User = require("../Models/User");
const { generateToken } = require('../utils/jwtUtils');
const { where } = require('sequelize');

exports.createUser = async (req,res) => {
    const {email, username,password} = req.body;
 
    // if (!email || !username || !password) {
    //     return res.status(400).json({
    //         message: 'All fields are required'
    //     });
    // }
    
    try{
        const existingUser = await User.findOne({
            where:{username:username}
        })
        if(existingUser){
            return res.status(400).json({
                message:'Username already taken!'
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await User.create({
            email,
            username,
            password:hashedPassword
        });
        console.log(req.body);
        res.status(201).json({
            message:'User successfully created!',
            user:{
                id: newUser.id,
                email: newUser.email,
                username: newUser.username
            }
            
        });


    }catch (error) {
        console.error("Error creating user:", error);
        if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map(err => err.message);
            return res.status(400).json({
                message: 'Validation error',
                errors: messages
            });
        }
    
        res.status(500).json({
            message: 'Something went wrong, user not created!',
            error: error.message
        });
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
    console.log("Received delete request for:", req.body.email);
   const {email, password} = req.body
const user = await User.findOne({
    where: {email} 
})
if(!user){
    console.log("No user found with email:", email);
    return res.status(404).json({message:'User not found'});
}  
console.log("User found, checking password...");
const isMatch = await bcrypt.compare(password, user.password);
if(!isMatch){
    console.log("Password mismatch for user:", email);
    return res.status(401).json({message:'Incorrect password'})
}
console.log("Password matched, attempting to delete user...");
const result = await User.destroy({
    where:{
        id: user.id,
     
    },   force: true
    
});
console.log("Destroy result:", result);
if (result === 0) {
    console.log("No records found to delete for user:", email);
    return res.status(404).json({ message: 'No user found to delete' });
}
console.log("User deleted successfully:", email);
res.status(200).json({message:'User account deleted successfully.'})
} catch(error){
    console.error("Error in deleteUser:", error);
    res.status(500).json({
        message:' NANI?! Failed to delete account!',
        error:error.message
    })
}
};

exports.addProfileImage = async (req,res) => {
try{
    const {email} = req.body
if(!req.file){
    return res.status(400).json({
        message:'nothing was uploaded'
    });
}
const user = await User.findOne({
    where:{email}
    })
if(!user){
    
return res.status(404).json({
    message:"user not found"
});
}
const [updated] = await User.update(
    {profileImage: req.file.path},
    {where:{id: user.id}}
);
if(updated){
    return res.status(200).json({
        message: 'Image updated successfully',
        profileImage:req.file.path
    })
}
   
}catch(error){
    res.status(500).json({
        message:"Something went wrong picture not uploaded",
        error:error.message
    })
}
}

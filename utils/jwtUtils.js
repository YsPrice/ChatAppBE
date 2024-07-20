const jwt = require('jsonwebtoken');
const User = require('../Models/User')
const generateToken = (user) =>{
    return jwt.sign(
    {id: user.id, email: user.email},
    process.env.JWT_SECRET,
    {expiresIn:'24h'}
    )
};

const authRequired = async (req,res,next) =>{
    const authHeader = req.headers.authorization;
    if( !authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message:'Auth token needed!'})
    }

    try{
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed: User not found' });
        }

        req.user = decoded;
        next();
    }catch(error){
return res.status(401).json({message:'Unauthorized: invalid token', error:error.message})
    }
}

module.exports = { generateToken, authRequired};
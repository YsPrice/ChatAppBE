const Message  = require('../Models/Message.js');
const User = require('../Models/User.js');


exports.createMessage = async (req,res) => {
const {fromUserId, toUserId, content } = req.body;

try{
    if(!content){
        return res.status(400).json({
            status:'error',
            message:'message cannot be empty!'
        })
    }
    const fromUserExists = User.findByPk(fromUserId);
const toUserExists = User.findByPk(toUserId);
if(!fromUserExists || !toUserExists){
    return res.status(404).json({
        status:'error',
        message:'One or more users not found!'
    });
}
const message = await Message.create({
    fromUserId,
    toUserId,
    content
});

res.status(201).json({
    status: 'success',
    data:{
        message
    }
});
    
}catch(error){
res.status(400).json({
    status: 'error',
    message:'Message creation failed!',
    error:error.message
});

}
}

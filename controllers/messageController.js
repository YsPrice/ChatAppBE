const Message  = require('../Models/Message.js');
const User = require('../Models/User.js');


exports.createMessage = async (req,res) => {
const {toUserId, content } = req.body;
const fromUserId = req.user.id 

try{
    if(!content){
        return res.status(400).json({
            status:'error',
            message:'message cannot be empty!'
        })
    }
  
const toUserExists = await User.findByPk(toUserId);

if(!toUserExists){
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
    data:{message}
});    
}catch(error){
res.status(500).json({
    status: 'error',
    message:'Message creation failed!',
    error:error.message
});

};

}

exports.editMessage = async (req,res) =>{
    const {messageId} = req.params;
    const { content } = req.body;
    const userId = req.user.id;
    try{
        const message = await Message.findByPk(messageId);
        if(!message){
            return res.status(404).json({
                message:'message not found!'
            });
        }
        if(message.fromUserId !== userId ){
            return res.status(403).json({
                message:'Not authorized to edit this message'
            });
        }
       const [updated] = await Message.update({content:content}, {where: {id: messageId} });
       if(updated){
        const updatedMessage = await Message.findByPk(messageId);
        res.status(200).json({message:'Message updated successfully', data:updatedMessage})
       }else{
        res.status(400).json({ message: "No changes made to the message." });

       }
    }catch(error){
        res.status(500).json({ message: "Failed to update message.", error: error.message });

    }
};

exports.deleteMessage = async (req,res) =>{
    const { messageId } = req.params;
    const userId = req.user.id;
    try{
        const message = await Message.findByPk(messageId);
        if(!message){
            return res.status(404).json({message:'message not found'})
        };
        if(message.fromUserId !== userId){
            return res.status(403).json({message:'not authorized to delete message'})
        }
        await message.destroy();
        res.status(204).send()
    }catch(error){
        res.status(500).json({message:'message not deleted!', error:error.message})
        
    }
};

exports.fetchMessages = async (req,res) =>{
    const { conversationId } = req.params
    const limit = parseInt(req.query.limit) ||10;
    const offset = parseInt(req.query.offset) || 0;
    try{
        const messages = await Message.findAll({
            where: {conversationId},
            limit,
            offset,
            order:[['createdAt', 'ASC']],
            include:[{model: User, as:'sender'}]
        });
        if( messages.length === 0){
            return res.status(404).json({message: 'no messages found in this conversation'});
        }
        res.status(200).json(messages)
    }catch(error){

    }
}
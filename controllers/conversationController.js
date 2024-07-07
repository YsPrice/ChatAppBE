const Conversation = require('../Models/Conversation.js');
const Message = require('../Models/Message');

exports.getConversation = async (req,res)=>{
    try{
    const { id } = req.params;
    const conversation = await Conversation.findByPk(id,{
    include:[{
        model: Message,
        as:'message'
     }]
});
    if(!conversation){
    return res.status(404).json({message:'conversation not found!'})
    }
res.json(conversation)
   }
    catch(error){
    res.status(500).json({
        message:'error fetching conversation!',
        error:error
    })
}

}
const Conversation = require('../Models/Conversation.js');
const Message = require('../Models/Message');


exports.createConversation = async (req,res) =>{
    try{
     
    const {title, participants} = req.body;
    const conversation = await Conversation.create({ 
        title,
        createdBy: req.user.id 
    });
    await conversation.addUser(req.user.id);
    await conversation.addUsers(participants);
    res.status(201).json(conversation);

    }catch(error){
        res.status(400).json({ message: "Failed to create conversation", error: error.message });

    }
};

exports.addParticipantsToConversations = async (req,res) =>{
    try{
const {conversationId, participantIds} = req.body;
const conversation = await Conversation.findByPk(conversationId);
if(!conversation) {
    return res.status(404).json({message:'conversation not found'});
}
const isAuthorized = conversation.Users.some(user=>
user.id === req.user.id && user.UserConversations.role === 'member');
if(!isAuthorized){
  return res.status(403).json({ message: 'Not authorized to add participants' });

}
await conversation.addUsers(participantIds);
res.status(200).json({message:"participant successfully added"})
    }catch(error){
        res.status(500).json({message: "Failed to add participants", error: error.message})
    }

};
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
    const isParticipant = conversation.Participants.some(participant => participant.id === req.user.id);
    if (!isParticipant) {
        return res.status(403).json({ message: 'You do not have permission to view this conversation.' });
    }

res.json(conversation)
   }
    catch(error){
    res.status(500).json({
        message:'error fetching conversation!',
        error:error
    })
}

};

exports.deleteConversation = async (req,res) =>{
    try{
        const { id } = req.params;
        const conversation = await Conversation.findByPk(id);

        if(!conversation){
            return res.status(404).json({ message: "No conversation found to delete" });

        }
        const isAuthorized = conversation.createdBy === req.user.id;
        if (!isAuthorized) {
            return res.status(403).json({ message: "You do not have permission to delete this conversation." });
        }
        const result = await Conversation.destroy({ where: { id }});
        if(result === 0){
            return res.status(404).json({message: "No conversation found to delete"})
        }
        res.status(204).send();
    }catch(error){
        res.status(500).json({ message: "Failed to delete conversation", error: error.message });

    }
}
const { User, Conversation, UserConversations, Message } = require('../db/associations');
const { Sequelize } = require('sequelize');

exports.createMessage = async (req, res) => {
    const { toUserIds, content } = req.body;
    const fromUserId = req.user.id;

    try {
        if (!content) {
            return res.status(400).json({
                status: 'error',
                message: 'Message cannot be empty!'
            });
        }

        console.log('Request body:', req.body);

     
        if (!Array.isArray(toUserIds)) {
            return res.status(400).json({
                status: 'error',
                message: 'Recipient user IDs must be an array!'
            });
        }

     
        const toUsersExist = await User.findAll({
            where: { id: toUserIds }
        });

        if (toUsersExist.length !== toUserIds.length) {
            return res.status(404).json({
                status: 'error',
                message: 'One or more recipient users not found!'
            });
        }

        const allUserIds = [fromUserId, ...toUserIds];

       
        let conversation = await Conversation.findOne({
            where: {
                is_private: toUserIds.length === 1, 
                // private if only one recipient
                id: {
                    [Sequelize.Op.in]: Sequelize.literal(`(
                        SELECT "conversation_id"
                        FROM "user_conversations"
                        WHERE "user_id" IN (${allUserIds.join(',')})
                        GROUP BY "conversation_id"
                        HAVING COUNT(DISTINCT "user_id") = ${allUserIds.length}
                    )`)
                }
            },
            include: [{
                model: User,
                as: 'participants',
                through: { attributes: [] }
            }]
        });

        if (conversation) {
            console.log(`Existing conversation found: ${conversation.id}`);
        } else {
            console.log('No existing conversation found, creating a new one.');
            // Create a new conversation if none exists
            conversation = await Conversation.create({
                title: toUserIds.length === 1 
                    ? `Private conversation between ${fromUserId} and ${toUserIds[0]}`
                    : `Group conversation with ${allUserIds.length} users`,
                created_by: fromUserId,
                is_private: toUserIds.length === 1 
            });

            const userConversations = allUserIds.map(userId => ({
                user_id: userId,
                conversation_id: conversation.id,
                role: 'member'
            }));

            await UserConversations.bulkCreate(userConversations);

            console.log(`New conversation created: ${conversation.id}`);
        }

        const message = await Message.create({
            from_user_id: fromUserId,
            to_user_id: toUserIds.length === 1 ? toUserIds[0] : null, 
            // null for group chats
            content,
            conversation_id: conversation.id
        });

        res.status(201).json({
            status: 'success',
            data: { message }
        });

    } catch (error) {
        console.error('Error creating message:', error);
        res.status(500).json({
            status: 'error',
            message: 'Message creation failed!',
            error: error.message
        });
    }
};


exports.editMessage = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    try {
        const message = await Message.findByPk(id);
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

   
        if (message.from_user_id !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized to edit this message' });
        }

        message.content = content || message.content;
        await message.save();

        res.json({
            status: 'success',
            data: { message }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to edit message',
            error: error.message
        });
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
        if(message.from_user_id !== userId){
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
            order:[['created_at', 'ASC']],
            include:[{model: User, as:'sender'}]
        });
        if( messages.length === 0){
            return res.status(404).json({message: 'no messages found in this conversation'});
        }
        res.status(200).json(messages)
    }catch(error){

    }
}
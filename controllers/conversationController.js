const { User, Conversation, UserConversations,Message } = require('../db/associations'); 


exports.createConversation = async (req, res) => {
    try {
        const { title, participants } = req.body;

        
        const conversation = await Conversation.create({
            title,
            created_by: req.user.id
        });

      
        await UserConversations.create({
            user_id: req.user.id,
            conversation_id: conversation.id,
            role: 'creator'
        });

        
        if (participants && participants.length > 0) {
            const participantEntries = participants.map(participantId => ({
                user_id: participantId,
                conversation_id: conversation.id,
                role: 'member'
            }));

            await UserConversations.bulkCreate(participantEntries);
        }

        res.status(201).json(conversation);

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Failed to create conversation", error: error.message });
    }
};

exports.addParticipantsToConversations = async (req, res) => {
    try {
        const { conversationId, participantIds } = req.body;
        const conversation = await Conversation.findByPk(conversationId);
        if (!conversation) {
            return res.status(404).json({ message: 'Conversation not found' });
        }

        const isAuthorized = await UserConversations.findOne({
            where: {
                user_id: req.user.id,
                conversation_id: conversation.id,
                role: 'creator'
            }
        });

        if (!isAuthorized) {
            return res.status(403).json({ message: 'Not authorized to add participants' });
        }
            console.log(conversationId)
        const participantEntries = [participantIds].map(participantId => ({
            user_id: participantId,
            conversation_id: conversation.id,
            role: 'member'
        }));

        await UserConversations.bulkCreate(participantEntries);

        res.status(200).json({ message: "Participants successfully added", participantIds:participantIds });

    } catch (error) {
        res.status(500).json({ message: "Failed to add participants", error: error.message});
       
    }
};


exports.getConversation = async (req, res) => {
    try {
        const { id } = req.params;
        const conversation = await Conversation.findByPk(id, {
            include: [{
                model: Message,
                as: 'messages'
            }, {
                model: User,
                as: 'participants',
                attributes: ['id', 'username', 'created_at', 'updated_at'],
                through: { attributes: [] }
            }]
        });

        if (!conversation) {
            return res.status(404).json({ message: 'Conversation not found!' });
        }
        res.json(conversation);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error fetching conversation',
            error: error.message
        });
    }
};


exports.deleteConversation = async (req, res) => {
    try {
        const { id } = req.params;
        const conversation = await Conversation.findByPk(id);

        if (!conversation) {
            return res.status(404).json({ message: "No conversation found to delete" });
        }

        const isAuthorized = conversation.created_by === req.user.id;
        if (!isAuthorized) {
            return res.status(403).json({ message: "You do not have permission to delete this conversation." });
        }

        await Conversation.destroy({ where: { id }});
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Failed to delete conversation", error: error.message });
    }
};

import mongoose from 'mongoose';

// Drop existing collection on server start
mongoose.connection.once('open', async () => {
    try {
        await mongoose.connection.collections.usermessagelimits?.drop();
        console.log('Dropped usermessagelimits collection');
    } catch (error) {
        console.log('No usermessagelimits collection to drop');
    }
});

const userMessageLimitSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    messageCount: {
        type: Number,
        default: 0
    },
    lastMessageTimestamp: {
        type: Date,
        default: null
    },
    cooldownUntil: {
        type: Date,
        default: null
    }
}, { 
    timestamps: true 
});

// Ensure unique index on user to prevent duplicate entries
userMessageLimitSchema.index({ user: 1 }, { unique: true });

// Drop existing model if it exists
if (mongoose.models.UserMessageLimit) {
    delete mongoose.models.UserMessageLimit;
}

const UserMessageLimit = mongoose.model('UserMessageLimit', userMessageLimitSchema);

export default UserMessageLimit;
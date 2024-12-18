import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Drop all indexes before defining new schema
mongoose.connection.once('open', async () => {
    try {
        await mongoose.connection.collections.users?.dropIndexes();
    } catch (error) {
        console.log('No indexes to drop');
    }
});

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    password: {
        type: String,
        required: true
    }
}, { 
    timestamps: true,
    autoIndex: true 
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Drop existing model if it exists
if (mongoose.models.User) {
    delete mongoose.models.User;
}

const User = mongoose.model('User', userSchema);

export default User;

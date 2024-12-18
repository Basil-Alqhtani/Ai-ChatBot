import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import OpenAI from 'openai';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import { auth } from './middleware/auth.js';
import User from './models/User.js';
import { checkMessageLimit } from './middleware/checkMessageLimit.js';

// Initialize OpenAI with API Key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
const port = 3000;

// Connect to MongoDB with retry logic
console.log('Attempting to connect to MongoDB...');
const connectWithRetry = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            retryWrites: true,
            w: 'majority'
        });
        console.log('Successfully connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        console.log('Retrying connection in 5 seconds...');
        setTimeout(connectWithRetry, 5000);
    }
};

connectWithRetry();

// Configure CORS to allow all origins during development
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static('.'));

// Basic route to test server
app.get('/test', (req, res) => {
    res.json({ message: 'Server is running!' });
});

// Test MongoDB connection
app.get('/test-db', async (req, res) => {
    try {
        // Check if we can perform a simple operation
        const collections = await mongoose.connection.db.collections();
        res.json({ 
            status: 'Database connected',
            collections: collections.map(c => c.collectionName)
        });
    } catch (error) {
        res.status(500).json({ 
            status: 'Database error',
            error: error.message
        });
    }
});

// Use authentication routes
app.use('/auth', authRoutes);

// Replace with your Assistant's ID
const ASSISTANT_ID = 'asst_jC5lvFTAQj7OkVfuCPB1ZFkd';

// Helper function to wait for run completion
async function waitForRunCompletion(threadId, runId) {
    while (true) {
        const run = await openai.beta.threads.runs.retrieve(threadId, runId);
        
        if (run.status === 'completed') {
            return run;
        }
        
        if (run.status === 'failed' || run.status === 'cancelled') {
            throw new Error(`Run failed with status: ${run.status}`);
        }
        
        // Wait for 1 second before checking again
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

// Route: Start a new thread
app.post('/start-thread', auth, async (req, res) => {
    try {
        // Create a new thread
        const thread = await openai.beta.threads.create();
        
        res.json({ 
            threadId: thread.id,
            message: 'Thread created successfully'
        });
    } catch (error) {
        console.error('Error creating thread:', error);
        res.status(500).json({ 
            error: 'Failed to create thread', 
            details: error.message 
        });
    }
});

// Route: Conversation handler
app.post('/conversation', auth, checkMessageLimit, async (req, res) => {
    const { threadId, message } = req.body;

    if (!threadId || !message) {
        return res.status(400).json({ message: 'Thread ID and message content are required' });
    }

    try {
        // Add user message to the existing thread
        await openai.beta.threads.messages.create(threadId, {
            role: 'user',
            content: message.trim(),
        });

        // Run the assistant
        const run = await openai.beta.threads.runs.create(threadId, {
            assistant_id: process.env.ASSISTANT_ID,
        });

        await waitForRunCompletion(threadId, run.id);
        const messageList = await openai.beta.threads.messages.list(threadId);
        const assistantMessages = messageList.data
            .filter(msg => msg.role === 'assistant')
            .sort((a, b) => b.created_at - a.created_at);

        if (assistantMessages.length === 0) {
            throw new Error('No assistant message found');
        }

        const latestAssistantMessage = assistantMessages[0];
        const assistantReply = latestAssistantMessage.content[0].text.value;

        res.json({ response: assistantReply });

    } catch (error) {
        console.error('Error in conversation:', error);
        res.status(500).json({ 
            message: 'عذراً، حدث خطأ في المحادثة. يرجى المحاولة مرة أخرى.',
            error: error.message 
        });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
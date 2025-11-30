require('dotenv').config();
const express = require('express');
const app = express();
const errorHandler = require('./middleware/errorHandler')
const routes = require('./routes/index');
const path = require('path');
const cors = require('cors');
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);

// Initialize Socket.IO
const io = new Server(httpServer, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
    }
});

// Make io available globally 
global.io = io;

// Load Cron Jobs
require('./cron_jobs/index')

app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,  
    methods: ['GET','POST', 'PUT', 'DELETE', 'PATCH' ],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(routes)
app.get('/', async(req,res) =>{            
    res.send('Welcome to Job Scheduler Backend');
})

app.use(errorHandler)

const PORT = process.env.PORT || 7700;
httpServer.listen(PORT, () =>{
    console.log('Server is running on port ' , PORT);
})
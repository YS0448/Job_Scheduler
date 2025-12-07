// require('dotenv').config();
// const express = require('express');
// const app = express();
// const errorHandler = require('./middleware/errorHandler')
// const routes = require('./routes/index');
// const path = require('path');
// const cors = require('cors');
// const { createServer } = require("http");
// const { Server } = require("socket.io");

// const httpServer = createServer(app);

// // Initialize Socket.IO
// const io = new Server(httpServer, {
//     cors: {
//         origin: process.env.CLIENT_URL,
//         methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
//         credentials: true
//     }
// });

// // Make io available globally 
// global.io = io;


// // Socket.IO connection handler
// io.on('connection', (socket) => {
//     console.log('✅ Client connected:', socket.id);
    
//     socket.on('disconnect', () => {
//         console.log('❌ Client disconnected:', socket.id);
//     });
// });

// // Load Cron Jobs
// require('./cron_jobs/index')

// app.use(express.json());
// app.use(cors({
//     origin: process.env.CLIENT_URL,  
//     methods: ['GET','POST', 'PUT', 'DELETE', 'PATCH' ],
//     credentials: true,
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.use(routes)
// app.get('/', async(req,res) =>{            
//     res.send('Welcome to Job Scheduler Backend');
// })

// app.use(errorHandler)

// const PORT = process.env.PORT || 7800;
// httpServer.listen(PORT, () =>{
//     console.log('Server is running on port ' , PORT);
// })


//  Global Error Handlers (TOP)
const logger = require('./utils/logger');

process.on('uncaughtException', (error) => {
    logger.error('🔥 UNCAUGHT EXCEPTION: %o', error);
    
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error('🔥 UNHANDLED REJECTION at %o, reason: %o', promise, reason);
});

//  Load Environment & Dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createServer } = require("http");
const { Server } = require("socket.io");
const path = require('path');

const routes = require('./routes/index');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const httpServer = createServer(app);

// Socket.IO Setup
const io = new Server(httpServer, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true
    },
    transports: ['websocket', 'polling'],
    allowEIO3: true
});

// Make io globally available
global.io = io;

io.on('connection', (socket) => {
    logger.info('✅ Client connected: %s', socket.id);

    socket.on('disconnect', () => {
        logger.info('❌ Client disconnected: %s', socket.id);
    });

    socket.on('error', (error) => {
        logger.error('Socket error on client %s: %o', socket.id, error);
    });
});

// Load Cron Jobs
try {
    logger.info('📅 Loading cron jobs...');
    require('./cron_jobs/index');
    logger.info('✅ Cron jobs loaded successfully');
} catch (error) {
    logger.error('❌ Error loading cron jobs: %o', error);
}

// Express Middleware
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET','POST','PUT','DELETE','PATCH'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(routes);

app.get('/', async (req, res) => {
    res.send('Welcome to Job Scheduler Backend');
});

// Centralized Express error handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 7800;
httpServer.listen(PORT, '0.0.0.0', () => {
    logger.info('═══════════════════════════════════════');
    logger.info(`🚀 Server is running on port %d', ${PORT}`);
    logger.info('📡 Socket.IO ready');
    logger.info(`🌐 CLIENT_URL: %s', ${process.env.CLIENT_URL}`);
    logger.info('═══════════════════════════════════════');
});

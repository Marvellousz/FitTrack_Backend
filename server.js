require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const workoutRoutes = require('./routes/workouts.js');
const userRoutes = require('./routes/user.js');

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: 'https://fit-track-frontend.vercel.app',
        credentials: true, // Enables sending cookies in cross-origin requests
    })
);

// Middleware to log requests
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Setting a global cookie for every request (Optional)
app.use((req, res, next) => {
    res.cookie('__vercel_live_token', 'your_cookie_value', {
        httpOnly: true,       // Prevent client-side JS from accessing the cookie
        secure: true,         // Ensure the cookie is sent over HTTPS
        sameSite: 'None',     // Required for cross-origin requests
        maxAge: 60 * 60 * 1000, // 1 hour (adjust as needed)
    });
    next();
});

// API routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

// Connect to MongoDB and start server
mongoose
    .connect(process.env.MONG_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });

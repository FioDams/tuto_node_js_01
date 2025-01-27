import express from 'express';
import { connect } from 'mongoose';
import stuffRoutes from './routes/stuff.js';

const app = express();

import dotenv from 'dotenv';
dotenv.config(); // { path: './.env' });

connect(process.env.MONGODB_URI!)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

// Middleware access-control
app.use((req, res, next) => {
    console.log(`Request method: ${req.method}`);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    next();
});

app.use('/api/stuff', stuffRoutes);

app.use((req, res, next) => {
    res.status(404);
});

export default app;

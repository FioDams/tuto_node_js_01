import express from 'express';
import { connect } from 'mongoose';
import stuffRoutes from './routes/stuff.js';
import userRoutes from './routes/user.js';
import path from 'path';

const app = express();

import dotenv from 'dotenv';
import cors from './middlewares/cors.js';
dotenv.config(); // { path: './.env' });

connect(process.env.MONGODB_URI!)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

// Middlewares
app.use(cors);

// rend accessible le dossier images
app.use('/images', express.static(path.join(import.meta.dirname, '../images')));

// Routes
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

app.use((req, res, next) => {
    res.status(404);
});

export default app;

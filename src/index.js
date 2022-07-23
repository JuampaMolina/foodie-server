import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Obtenemos las variables del .env
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
const CONNECTION_URI = process.env.MONGO_URI;

// Abrimos el servidor si la conexión con mongo es extitosa
mongoose.connect(CONNECTION_URI)
    .then(() => app.listen(PORT, () => console.log(`Server running at ${PORT}`)))
    .catch((error) => console.error(error.message));
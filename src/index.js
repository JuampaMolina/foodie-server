import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import itemRoutes from './routes/items.js'

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use('/items', itemRoutes);

// 404
app.use(function (req, res) {
    res.status(404).json({
      message: "Page does not exist"
    });
  });

const PORT = process.env.PORT || 3000;

// Abrimos el servidor si la conexión con mongo es extitosa
mongoose.connect(process.env.MONGO_URI)
    .then(() => app.listen(PORT, () => console.log(`Server running at ${PORT}`)))
    .catch((error) => console.error(error.message));
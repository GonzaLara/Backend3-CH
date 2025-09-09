import 'dotenv/config.js';
import mongoose from 'mongoose';
import app from './app.js';

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

async function start() {
  try {
    if (!MONGO_URI) throw new Error('MONGO_URI no esta definido en .env');
    await mongoose.connect(MONGO_URI);
    console.log('Base de datos conectada');

    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error inicializando la app:', err.message);
    process.exit(1);
  }
}

start();
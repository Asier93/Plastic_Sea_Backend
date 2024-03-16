const mongoose = require('mongoose');

// Función para conectar a la base de datos
async function conectarDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mar');
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1); // Salir del proceso si hay un error en la conexión
  }
}

module.exports = conectarDB;
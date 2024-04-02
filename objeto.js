const mongoose = require('mongoose');


const objetoSchema = new mongoose.Schema({
  objetoId: String,
  titulo: String,
  contenido: String
});

module.exports = mongoose.model('Objeto', objetoSchema)
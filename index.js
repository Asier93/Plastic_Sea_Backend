const express = require('express');
const cors = require('cors');
const conectarDB = require('./db');
const Objeto = require('./objeto'); // Importa el modelo de objeto definido en objeto.js

conectarDB();

const app = express();
app.use(express.json());
app.use(cors()); // Habilita CORS para todas las rutas



app.get('/api/data/:objetoId', async (req, res) => {
  const objetoId = req.params.objetoId;
  try {
    const data = await Objeto.findOne({ _id: objetoId });
    if (!data) {
      return res.status(404).json({ error: 'No se encontraron datos para el objeto especificado' });
    }
    res.json(data);
  } catch (error) {
    console.error('Error al obtener datos desde MongoDB:', error);
    res.status(500).send('Error interno del servidor');
  }
});

app.post('/api/data', async (req, res) => {
  try {
    const { objetoId, titulo, contenido } = req.body;
    const nuevoObjeto = new Objeto({ objetoId, titulo, contenido });
    await nuevoObjeto.save();
    res.status(201).send('Objeto creado exitosamente');
  } catch (error) {
    console.error('Error al crear objeto en MongoDB:', error);
    res.status(500).send('Error interno del servidor');
  }
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Servidor backend en ejecución en http://localhost:${PORT}`);
});
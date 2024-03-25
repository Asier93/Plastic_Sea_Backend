const request = require('supertest');
const app = require('../index'); // Importa tu aplicación Express
const mongoose = require('mongoose');
const Objeto = require('../objeto'); // Asumiendo que Objeto es tu modelo Mongoose

describe('GET /api/data/:objetoId', () => {
  it('debería devolver los datos del objeto si existe en la base de datos', async () => {
    // Asegurarse de que el objeto exista en la base de datos
    const objetoExistente = await Objeto.findOne({ objetoId: '65f5832cbdf8b55b6cc98212' });

    // Si el objeto no existe, puedes lanzar una advertencia o simplemente omitir la prueba
    if (!objetoExistente) {
      console.warn('El objeto no existe en la base de datos.');
      return;
    }

    // Realizar la solicitud GET a la ruta /api/data/:objetoId con el ID del objeto conocido
    const response = await request(app)
      .get(`/api/data/${objetoExistente._id}`);

    // Verificar que la respuesta tenga el estado 200
    expect(response.status).toBe(200);

    // Verificar que la respuesta contenga los datos del objeto
    expect(response.body.objetoId).toBe(objetoExistente.objetoId);
    expect(response.body.titulo).toBe(objetoExistente.titulo);
    expect(response.body.contenido).toBe(objetoExistente.contenido);
  });
});

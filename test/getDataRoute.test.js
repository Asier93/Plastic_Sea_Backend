const request = require("supertest");
const app = require("../index");
const mongoose = require("mongoose");
const Objeto = require("../objeto");

describe("GET /api/data/:objetoId", () => {
  it("debería devolver los datos del objeto si existe en la base de datos", async () => {
    const objetoExistente = await Objeto.findOne({
      objetoId: "65f5832cbdf8b55b6cc98212",
    });

    if (!objetoExistente) {
      console.warn("El objeto no existe en la base de datos.");
      return;
    }

    const response = await request(app).get(`/api/data/${objetoExistente._id}`);

    expect(response.status).toBe(200);

    expect(response.body.objetoId).toBe(objetoExistente.objetoId);
    expect(response.body.titulo).toBe(objetoExistente.titulo);
    expect(response.body.contenido).toBe(objetoExistente.contenido);
  });
});

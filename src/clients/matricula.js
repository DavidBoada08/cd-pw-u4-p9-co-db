import axios from "axios";

const consultarTodos = async (token) => {
  const respuesta = axios
    .get("http://localhost:8081/matricula/api/v1.0/estudiantes", {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          `Bearer ${token}`,
      },
    })
    .then((respuesta) => respuesta.data);
  console.log(respuesta);
  return respuesta;
};

const consultarPorId = async (id, token) => {
  const respuesta = await axios
    .get(`http://localhost:8081/matricula/api/v1.0/estudiantes/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          `Bearer ${token}`,
      },
    })
    .then((respuesta) => respuesta.data);
  console.log(respuesta);
  return respuesta;
};

const actualizar = async (id, body, token) => {
  const r = await axios
    .put(`http://localhost:8081/matricula/api/v1.0/estudiantes/${id}`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          `Bearer ${token}`,
      },
    })
    .then((r) => r.data);
  console.log(r);
  return r;
};

const guardar = async (body, token) => {
  const r = await axios.post(
    "http://localhost:8081/matricula/api/v1.0/estudiantes",
    body,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          `Bearer ${token}`,
      },
    },
  );
  return r.data;
};

const actualizarParcial = async (id, body, token) => {
  const r = axios
    .patch(`http://localhost:8081/matricula/api/v1.0/estudiantes/${id}`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          `Bearer ${token}`,
      },
    })
    .then((r) => r.data);
  console.log(r);
  return r;
};

const borrar = async (id, token) => {
  axios
    .delete(`http://localhost:8081/matricula/api/v1.0/estudiantes/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          `Bearer ${token}`,
      },
    })
    .then((r) => r.data);
};

export async function obtenerEstudiantesFacade(token) {
  return await consultarTodos(token);
}

export async function obtenerEstudiantePorIdFacade(id, token) {
  return await consultarPorId(id, token);
}

export async function guardarFacade(body, token) {
  return await guardar(body, token);
}

export async function actualizarFacade(id, body, token) {
  return await actualizar(id, body, token);
}

export async function actualizarParcialFacade(id, body, token) {
  return await actualizarParcial(id, body, token);
}

export async function borrarFacade(id, token) {
  return await borrar(id, token);
}

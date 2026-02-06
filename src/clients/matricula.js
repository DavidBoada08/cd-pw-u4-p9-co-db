import axios from "axios";

const consultarTodos = async () => {
  const respuesta = axios
    .get("http://localhost:8081/matricula/api/v1.0/estudiantes", {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((respuesta) => respuesta.data);
  console.log(respuesta);
  return respuesta;
};

const consultarPorId = async (id) => {
  const respuesta = await axios
    .get(`http://localhost:8081/matricula/api/v1.0/estudiantes/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((respuesta) => respuesta.data);
  console.log(respuesta);
  return respuesta;
};

const actualizar = async (id, body) => {
  const r = await axios
    .put(`http://localhost:8081/matricula/api/v1.0/estudiantes/${id}`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((r) => r.data);
  console.log(r);
  return r;
};

const guardar = async (body) => {
  const r = await axios.post(
    "http://localhost:8081/matricula/api/v1.0/estudiantes",
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return r.data;
};

const actualizarParcial = async (id, body) => {
  const r = axios
    .patch(`http://localhost:8081/matricula/api/v1.0/estudiantes/${id}`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((r) => r.data);
  console.log(r);
  return r;
};

const borrar = async (id) => {
  axios
    .delete(`http://localhost:8081/matricula/api/v1.0/estudiantes/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((r) => r.data);
};

export async function obtenerEstudiantesFacade() {
  return await consultarTodos();
}

export async function obtenerEstudiantePorIdFacade(id) {
  return await consultarPorId(id);
}

export async function guardarFacade(body) {
  return await guardar(body);
}

export async function actualizarFacade(id, body) {
  return await actualizar(id, body);
}

export async function actualizarParcialFacade(id, body) {
  return await actualizarParcial(id, body);
}

export async function borrarFacade(id) {
  return await borrar(id);
}

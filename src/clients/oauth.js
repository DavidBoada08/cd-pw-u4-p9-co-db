import axios from "axios";

const obtenerToken = async () => {
  const body = {
    username: "dave",
    password: "123456789",
  };

  const respuesta = await axios.post(
    "http://localhost:8082/auth/token",
    body
  );

  const token = String(
    respuesta.data.accessToken ?? respuesta.data.access_token ?? ""
  ).trim();
  return token; // 👈 SOLO el token
};

export async function obtenerTokenFacade() {
  return await obtenerToken();
}

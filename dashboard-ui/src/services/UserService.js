import axios from "axios";
import env from "react-dotenv";

const http = axios.create({
  baseURL: env.USERS_API_BASE_URL,
  headers: {
    "Content-type": "application/json",
    'Access-Control-Allow-Origin': env.USERS_API_BASE_URL,
    'Access-Control-Allow-Headers': "*",
    'Access-Control-Allow-Credentials': true
  }
});

const getAll = () => {
  return http.get("/users");
};

const checkApi = async () => {
  try {
    const resp = await http.head("/users/health-check")
    console.log({ resp })
    return resp.status === 200 ? true : false;
  } catch(e) {
    return false
  }
};

const get = (id) => {
  return http.get(`/users/${id}`);
};

const create = (data) => {
  return http.post("/users", data);
};

const update = (id, data) => {
  return http.patch(`/users/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/users/${id}`);
};

const UsersService = {
  checkApi,
  getAll,
  get,
  create,
  update,
  remove,
};

export default UsersService;

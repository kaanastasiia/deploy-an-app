import axios from "axios";
import env from "react-dotenv";

const http = axios.create({
  baseURL: env.DOCUMENTS_API_BASE_URL,
  headers: {
    "Content-type": "application/json",
    'Access-Control-Allow-Origin': env.DOCUMENTS_API_BASE_URL,
    'Access-Control-Allow-Headers': "*",
    'Access-Control-Allow-Credentials': true
  }
});

const checkApi = async () => {
  try {
    const resp = await http.head("/documents/health-check")
    console.log({ resp })
    return resp.status === 200 ? true : false;
  } catch(e) {
    return false
  }
};

const getAll = () => {
  return http.get("/documents");
};

const get = (id) => {
  return http.get(`/documents/${id}`);
};

const create = (data) => {
  return http.post("/documents", data);
};

const update = (id, data) => {
  return http.patch(`/documents/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/documents/${id}`);
};

const DocumentService = {
  checkApi,
  getAll,
  get,
  create,
  update,
  remove,
};

export default DocumentService;

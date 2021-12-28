import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "9485e521f73209c2a78614a83105fd49",
    language: "pt",
    include_adult: false,
  },
});

export default api;

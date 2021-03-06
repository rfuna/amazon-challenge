import axios from "axios";

const instance = axios.create({
  // the API (cloud function) URL should go in the "" below here
  baseURL: "http://localhost:5001/challenge-63392/us-central1/api",
});

export default instance;

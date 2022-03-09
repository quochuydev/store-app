import axios from "axios";
import config from "./config";

axios.defaults.baseURL = config.server;
// axios.defaults.withCredentials = true;

export default axios;

import { AXIOS_CONFIG } from "@/config/axios.config";
import axios from "axios";

export const instance = axios.create(AXIOS_CONFIG);

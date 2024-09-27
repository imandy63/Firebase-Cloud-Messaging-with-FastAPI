import { CreateAxiosDefaults } from "axios";

export const AXIOS_CONFIG: CreateAxiosDefaults = {
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 10000,
};

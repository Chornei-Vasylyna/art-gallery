import axios from "axios";
import { env } from "@/app/config/env";

export const apiClient = axios.create({
	baseURL: env.VITE_API_URL,
	withCredentials: true,
});
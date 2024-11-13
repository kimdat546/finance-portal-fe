import { ENV } from "@/configs/env";
import axios, { AxiosError, AxiosResponse } from "axios";

export const instance = axios.create({
    baseURL: ENV.APP_API_ENDPOINT,
    withCredentials: true,
});

function onError400(
    error: AxiosError<{ title: string; desc: string[]; actions: string[] }>
) {
    if (error.config?.headers["manual_handle_error"]) return;
}

instance.interceptors.response.use(
    (response: AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>) => response,
    async (error) => {
        const { response } = error;
        if (response?.status === 400) {
            onError400(error);
        }

        return Promise.reject(error);
    }
);

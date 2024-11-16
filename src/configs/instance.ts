import { ENV } from "@/configs/env";
import { showToast } from "@/lib/toastUtils";
import { refreshToken } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
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

instance.interceptors.request.use(async (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

instance.interceptors.response.use(
    (response: AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>) => response,
    async (error) => {
        const { response, config: originalRequest } = error;
        if (response?.status === 400) {
            onError400(error);
        }
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const newAccessToken = await refreshToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
            return instance(originalRequest);
        }

        showToast(
            `Error ${response?.status || ''}`,
            response?.data?.message || 'An error occurred'
        );

        return Promise.reject(error);
    }
);

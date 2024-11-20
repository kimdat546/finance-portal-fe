import { ENV } from "@/configs/env";
import { refreshToken } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "sonner";

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

        if (response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Check if the request is the refresh token request to avoid infinite loop
            if (originalRequest.url?.includes('/auth/refresh-token')) {
                useAuthStore.getState().setAccessToken(null);
                window.location.href = '/auth/login';
                return Promise.reject(error);
            }

            const newAccessToken = await refreshToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return instance(originalRequest);
        }

        toast.error(`Error ${response?.status || ''}`,
            {
                description: response?.data?.message || 'An error occurred' || error.message,
                action: {
                    label: 'Close',
                    onClick: () => console.log('Close!'),
                },
            },
        );

        return Promise.reject(error);
    }
);

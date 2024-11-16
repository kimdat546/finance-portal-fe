import { instance } from '@/configs/instance';
import { useAuthStore } from '@/store/authStore';

export const signup = async (data: { email: string; password: string; name?: string }) => {
    const response = await instance.post('/auth/signup', data);
    const { accessToken } = response.data;
    useAuthStore.getState().setAccessToken(accessToken);
    return response.data;
};

export const login = async (data: { email: string; password: string }) => {
    const response = await instance.post('/auth/login', data);
    console.log("response", response)
    const { accessToken } = response.data;
    useAuthStore.getState().setAccessToken(accessToken);
    return response.data;
};


export const logout = async () => {
    await instance.post('/auth/logout');
    useAuthStore.getState().setAccessToken(null);
};

export const refreshToken = async () => {
    const response = await instance.post('/auth/refresh-token');
    const { accessToken } = response.data;
    useAuthStore.getState().setAccessToken(accessToken);
    return accessToken;
};

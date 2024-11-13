import { login, logout, refreshToken, signup } from '@/services/authService';
import { useMutation } from '@tanstack/react-query';

export const useLogin = () => {
    return useMutation({
        mutationFn: login,
    });
};

export const useSignup = () => {
    return useMutation({
        mutationFn: signup,
    });
};

export const useLogout = () => {
    return useMutation({
        mutationFn: logout,
    });
}

export const useRefreshToken = () => {
    return useMutation({
        mutationFn: refreshToken,
    });
}

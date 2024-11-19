import { instance } from '@/configs/instance';

export const fetchWallets = async () => {
    const response = await instance.get('/wallets');
    return response.data;
};

export const fetchMyWallets = async () => {
    const response = await instance.get('/wallets/me');
    return response.data;
};

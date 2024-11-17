import { instance } from '@/configs/instance';

export const uploadTransactions = async (data: any) => {
    const response = await instance.post('/transactions/upload', data);
    return response.data;
};

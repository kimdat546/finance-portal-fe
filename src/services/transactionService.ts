import { instance } from '@/configs/instance';

export const uploadTransactions = async (data: any) => {
    const response = await instance.post('/transactions/upload', data);
    return response.data;
};

export const fetchTransactions = async (page: number, pageSize: number) => {
    const response = await instance.get('/transactions', {
        params: { page, pageSize, },
    });
    return response.data;
};

import { instance } from '@/configs/instance';

export const uploadTransactions = async (data: any) => {
    const response = await instance.post('/transactions/upload', data);
    return response.data;
};

export const fetchTransactions = async (page: number, pageSize: number, search: string = '', filters: Record<string, any> = {}) => {
    const formattedFilters = { ...filters };

    if (filters.transactionType) {
        formattedFilters.transactionType = Array.isArray(filters.transactionType)
            ? filters.transactionType
            : filters.transactionType.split(',');
    }

    if (filters.categoryId) {
        formattedFilters.categoryId = Array.isArray(filters.categoryId)
            ? filters.categoryId
            : filters.categoryId.split(',');
    }

    const response = await instance.get('/transactions', {
        params: {
            page,
            pageSize,
            search,
            ...formattedFilters,
        },
    });
    return response.data;
};

import { instance } from '@/configs/instance';
import { Category } from '@/types';

export const fetchCategories = async () => {
    const response = await instance.get<Category[]>('/categories');
    return response.data;
};

export const createCategories = async (data: any) => {
    const response = await instance.post('/categories/bulk', data);
    return response.data;
};

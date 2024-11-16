import { toast as toastFunction } from '@/hooks/use-toast';

export const showToast = (title: string, description: string) => {
    toastFunction({
        title,
        description,
    });
};

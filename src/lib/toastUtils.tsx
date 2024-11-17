import { toast as toastFunction } from '@/hooks/use-toast';

// TODO: replace to use sonner https://ui.shadcn.com/docs/components/sonner
export const showToast = (title: string, description: string) => {
    toastFunction({
        title,
        description,
    });
};

import { uploadTransactions } from '@/services/transactionService';
import { useMutation } from '@tanstack/react-query';

export const useUploadTransactions = () => {
    return useMutation({
        mutationFn: uploadTransactions,
    });
};

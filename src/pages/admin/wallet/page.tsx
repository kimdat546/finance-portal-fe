import { Separator } from '@/components/ui';
import { PaymentMethodForm } from '@/modules/PaymentMethodForm';

const page = () => {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Wallets</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your wallets and transactions.
                </p>
            </div>
            <Separator />
            <PaymentMethodForm />
        </div>
    );
}

export default page

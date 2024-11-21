import { Separator } from "@/components/ui";
import { CategoriesForm } from "@/modules/CategoriesForm";
import { ProfileForm } from "@/modules/ProfileForm";

const page = () => {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Categories</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your categories here
                </p>
            </div>
            <Separator />
            <CategoriesForm />
        </div>
    );
};

export default page;

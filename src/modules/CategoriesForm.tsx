import {
    Button,
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { createCategories, fetchCategories } from "@/services/categoryService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
    categories: z.array(
        z.object({
            name: z.string().min(1),
            parentId: z.string().optional(),
        })
    ),
});

type formType = z.infer<typeof schema>;

const defaultValues: formType = {
    categories: [
        {
            name: "",
            parentId: "",
        },
    ],
};

interface CategoriesFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CategoriesForm({ className }: CategoriesFormProps) {
    const { mutate: createCategoriesMutation, isPending } = useMutation({
        mutationFn: createCategories,
    });

    const { data: categories, refetch: refetchCategories } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    });

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues,
        mode: "onChange",
    });

    const { fields, append } = useFieldArray({
        name: "categories",
        control: form.control,
    });

    const onSubmit = async (data: formType) => {
        await createCategoriesMutation(data, {
            onSuccess: () => {
                toast.success("Categories created successfully");
                refetchCategories();
                form.reset();
            },
        });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn("space-y-8", className)}
            >
                <div className="flex flex-col gap-3">
                    {fields.map((field, index) => (
                        <div
                            key={field.id}
                            className="flex items-start gap-3 border-b pb-5 border-zinc"
                        >
                            <FormField
                                control={form.control}
                                key={field.id}
                                name={`categories.${index}.name`}
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Category name"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`categories.${index}.parentId`}
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field.value}
                                                onValueChange={(value) => {
                                                    field.onChange(value);
                                                    console.log(
                                                        "change",
                                                        value
                                                    );
                                                }}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {categories?.map(
                                                        (category) => (
                                                            <SelectItem
                                                                key={
                                                                    category.id
                                                                }
                                                                value={
                                                                    category.id as string
                                                                }
                                                            >
                                                                {category.name}
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    ))}
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() =>
                            append({
                                name: "",
                                parentId: "",
                            })
                        }
                    >
                        Add category
                    </Button>
                </div>
                <Button type="submit" disabled={isPending}>
                    Create categories
                </Button>
            </form>
        </Form>
    );
}

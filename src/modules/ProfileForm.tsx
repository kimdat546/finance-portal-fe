
import { Button, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input } from "@/components/ui"
import { PATH } from "@/constants/common"
import { useLogin } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"
import { iziRoute } from "@/routes/routes"
import { zodResolver } from "@hookform/resolvers/zod"
import { Computer, LoaderCircle } from 'lucide-react'
import * as React from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z } from "zod"

const schema = z.object({
    name: z.string(),
    avatarUrl: z.string().url(),
})

type formType = z.infer<typeof schema>

const defaultValues: formType = {
    name: "",
    avatarUrl: ""
}

interface ProfileFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function ProfileForm({ className }: ProfileFormProps) {
    const { mutate: login, isPending } = useLogin();

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues,
    })

    const onSubmit = async (data: formType) => {
        // await login(data, {
        //     onSuccess: () => {
        //         navigate(
        //             iziRoute.getPathById(PATH.dashboard)
        //         )
        //     },
        // })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-8", className)} >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your name" type="text"
                                    {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name. It can be your real name or a
                                pseudonym. You can only change this once every 30 days.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="avatarUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Avatar</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="https://example.com/avatar.png" type="url"
                                    {...field} />
                            </FormControl>
                            <FormDescription>
                                Your avatar is an image that represents you. You can use your
                                Gravatar, or upload a custom image.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
            <Button type="submit" disabled={isPending}>Update profile</Button>
        </Form>
    )
}

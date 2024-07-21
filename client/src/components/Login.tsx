"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { Cat } from "lucide-react";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const FormSchema = z.object({
    email: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(5, {
        message: "Password must be at least 5 characters.",
    }),
});

export function LoginComponent() {
    const [error, setError] = useState("");
    const router = useRouter();


    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (formData: z.infer<typeof FormSchema>) => {
        const res = await signIn("credentials", {
            email: formData.email,
            password: formData.password,
            redirect: false,
        });
        if (res?.error) {
            form.setError("email", {
                type: "manual",
                message: "Invalid email or password.",
            });
        }
        if (res?.ok) {
            return router.push("/");
        }
    }

    return (
        <div className="flex flex-col w-full items-center justify-center min-h-screen ">
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-3xl  pt-3 pb-10 px-20 space-y-6 bg-white bg-opacity-10 rounded shadow-md">
                    <p className='text-yellow-500 flex flex-col items-center justify-center'>
                        CATSINO
                        <Cat />
                    </p>
                    <p className="text-3xl text-center">Login into your account</p>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type='email' placeholder="Enter your email" {...field} className="text-black" />
                                </FormControl>
                                <FormDescription>
                                    Enter your unique email.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Enter your password" {...field} className="text-black" />
                                </FormControl>
                                <FormDescription>
                                    Your password should be secure and private.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full bg-yellow-500">Log In</Button>
                </form>
                <div className="text-center pt-5">
                    <Link href="/signup" className="text-blue-400 underline">
                        If you don&apos;t have an account, create one
                    </Link>
                </div>
            </Form>
        </div>
    );
}

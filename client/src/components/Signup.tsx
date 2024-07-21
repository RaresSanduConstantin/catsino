"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from 'react';
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Cat } from "lucide-react";

import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { register } from "@/actions/register";
import { signIn } from 'next-auth/react';

const FormSchema = z.object({
    username: z.string().min(2, { message: "Username must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(5, { message: "Password must be at least 5 characters." }),
    confirmPassword: z.string().min(5, { message: "Confirm Password must be at least 5 characters." }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
});


export function SignupComponent() {

    const [error, setError] = useState<string>();
    const router = useRouter();
    const ref = useRef<HTMLFormElement>(null);


    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });


    const onSubmit = async (formData: z.infer<typeof FormSchema>) => {
        const r = await register({
            email: formData.email,
            password: formData.password,
            username: formData.username
        });
        ref.current?.reset();
        if (r?.error) {
            form.setError("email", {
                type: "manual",
                message: r?.error,
            });
        } else {
            // Automatically sign in the user after registration
            const result = await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false, // Prevent redirect to avoid page refresh
            });
            if (result?.ok) {
                // Redirect user after successful login
                router.push("/");
            } else if (result?.error) {
                // Handle errors if login fails
                form.setError("email", {
                    type: "manual",
                    message: result?.error
                });
            }
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-3xl pt-3 pb-10 px-20 space-y-6 bg-white bg-opacity-10 rounded shadow-md">
                    <p className='text-yellow-500 flex flex-col items-center justify-center'>
                        CATSINO
                        <Cat />
                    </p>
                    <p className="text-3xl text-center ">Create your account</p>
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your username" {...field} className="text-black" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Your email" {...field} className="text-black" />
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
                                    <Input type="password" placeholder="Your password" {...field} className="text-black" />
                                </FormControl>
                                <FormMessage />

                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Confirm your password" {...field} className="text-black" />
                                </FormControl>
                                <FormMessage />

                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full bg-yellow-500">Sign Up</Button>
                </form>
                <div className="text-center pt-5">
                    <Link href="/login">
                        Already have an account? Log in
                    </Link>
                </div>
            </Form>
        </div>
    );
}

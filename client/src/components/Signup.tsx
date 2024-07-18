"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const FormSchema = z.object({
  username: z.string().min(2, { message: "Username must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(5, { message: "Password must be at least 5 characters." }),
  confirmPassword: z.string().min(5, { message: "Confirm Password must be at least 5 characters." }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});




import React from 'react';
import { useForm } from "react-hook-form";
import {  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";

export function SignupComponent() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: any) {
    toast({
      title: "Account Created Successfully!",
      description: `Welcome, ${data.username}!`,
    });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
          <p className="text-3xl text-center text-black">Create your account</p>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Your username" {...field} className="text-black" />
                </FormControl>
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
                  <Input type="password" placeholder="Your password" {...field}  className="text-black"/>
                </FormControl>
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
                  <Input type="password" placeholder="Confirm your password" {...field} className="text-black"/>
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">Sign Up</Button>
        </form>
        <div className="text-center">
          <Link href="/login">
            Already have an account? Log in
          </Link>
        </div>
      </Form>
    </div>
  );
}

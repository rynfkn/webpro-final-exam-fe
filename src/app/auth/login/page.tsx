"use client";

import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  Email: z.string().email(),
  Password: z.string().min(4),
});

export default function Login() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Email: "",
      Password: "",
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {

      interface LoginResponse {
        data: { id: string; name: string; role: string; token: string; };
      }

      const response = await axios.post<LoginResponse>("/api/auth/login", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if(response.status === 200) {
        console.log(response.data);

        const { id, name, role, token } = response.data.data;

        localStorage.setItem('id', id);
        localStorage.setItem('name', name);
        localStorage.setItem('role', role);
        localStorage.setItem("userToken", token);
        
        router.push('/dashboard');
      }
      else {
        console.log("Login failed. Please check your credentials and try again.");
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-[20%]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="Email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

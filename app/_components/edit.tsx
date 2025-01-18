"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

import axios from "axios";
import { useState } from "react";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { user } from "@prisma/client";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "nom must be at least 2 characters.",
  }),
  prenom: z.string().min(2, {
    message: "prenom must be at least 2 characters.",
  }),
  age: z.coerce.number()
});

const Edit = ({user}: {user: user | null}) => {
  const router = useRouter();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      name: user?.name,
      prenom: user?.prenom,
      age: user?.age
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmiting(true);
      toast("user is created...");
      const response = await axios.patch(`/api/user/${user?.id}`, {
        ...values,
      });
      if (response.status === 201) {
        toast.success("user is created", {
          className: "bg-green",
        });
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      toast.warning("something went wrong", {
        className: "bg-rose-500 text-white",
      });
    } finally {
      setIsSubmiting(false);
    }
  }
  return (
    <div className="p-10 max-w-[70%] h-1/2 border mx-auto mt-20">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>nom</FormLabel>
                <FormControl>
                  <Input placeholder="votre nom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="prenom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>prenom</FormLabel>
                <FormControl>
                  <Input placeholder="votre prenom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>age</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="votre age" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Submit
            {isSubmiting && <Loader className="h-5 w-5 animate-spin" />}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Edit;

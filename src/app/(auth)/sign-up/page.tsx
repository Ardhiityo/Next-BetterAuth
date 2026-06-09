"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { signUp } from "@/lib/auth-client";
import * as z from "zod";
import { useState } from "react";

const formSchema = z
  .object({
    name: z.string().min(5, "Name must be at least 5 characters."),
    email: z.email().min(5, "Email must be at least 5 characters."),
    password: z.string().min(5, "Password must be at least 5 characters."),
    passwordConfirmation: z
      .string()
      .min(5, "Password Confirmation must be at least 5 characters."),
  })
  .refine((data) => data.password == data.passwordConfirmation, {
    error: "Password do not match",
    path: ["password"],
  });

export default function Page() {
  const [loading, setLoading] = useState(false);

  const { handleSubmit, control } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    const res = await signUp.email({
      ...data,
      callbackURL: "/dashboard", // URL tujuan setelah verifikasi email berhasil!
    });
    if (res.error) {
      toast.error(res.error.message, { position: "top-center" });
    } else {
      toast.success("SignUp Successfully! Check your email for verification.", {
        position: "top-center",
      });
    }
    setLoading(false);
  };

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Lets Sign Un.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-sigin" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    {...field}
                    type="text"
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Your name"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    type="email"
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Your Email"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    id="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Your password"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="passwordConfirmation"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="passwordConfirmation">
                    Password Confirmation
                  </FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    id="passwordConfirmation"
                    aria-invalid={fieldState.invalid}
                    placeholder="Your password confirmation"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="submit" form="form-sigin">
            {loading ? "Loading..." : "Submit"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}

import { authIsNotRequired } from "@/lib/auth-utiils";
import React from "react";
import { Toaster } from "sonner";

async function layout({ children }: { children: React.ReactNode }) {
  await authIsNotRequired();
  return (
    <section className="container mx-auto py-6 flex justify-center items-center min-h-screen">
      <Toaster />
      {children}
    </section>
  );
}

export default layout;

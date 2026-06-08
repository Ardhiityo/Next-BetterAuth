import React from "react";
import { Toaster } from "sonner";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="container mx-auto py-6 flex justify-center items-center min-h-screen">
      <Toaster />
      {children}
    </section>
  );
}

export default layout;

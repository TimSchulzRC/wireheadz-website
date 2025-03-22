import { cn } from "@/lib/utils";
import React from "react";

export default function Section({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("container mx-auto my-24 px-6 md:px-12", className)}>
      {children}
    </section>
  );
}

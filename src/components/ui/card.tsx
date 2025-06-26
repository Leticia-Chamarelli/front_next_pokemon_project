import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn("rounded-2xl border bg-white p-4 shadow-sm", className)}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: CardProps) {
  return <div className={cn("p-4", className)} {...props} />;
}

export function CardHeader({ className, ...props }: CardProps) {
  return (
    <div className={cn("px-4 pt-4", className)} {...props} />
  );
}

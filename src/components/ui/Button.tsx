import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: "primary" | "secondary" | "light";
  children: ReactNode;
  showArrow?: boolean;
};

export function Button({ href, variant = "primary", children, showArrow = true, className = "", ...props }: ButtonProps) {
  return (
    <Link className={`button button--${variant} ${className}`.trim()} href={href} data-analytics-event={variant === "primary" ? "primary_cta_click" : undefined} {...props}>
      {children}
      {showArrow && <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.8} />}
    </Link>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

const links = [
  { label: "Services", href: "/services" },
  { label: "Hospitality", href: "/hospitality" },
  { label: "Selected work", href: "/work" },
  { label: "About", href: "/about" },
];

export function GlobalNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link className="brand" href="/" aria-label="Trio Digitals home">
          <Image className="brand__image" src="/trio-digitals-logo.png" alt="Trio Digitals logo" width={72} height={72} priority />
        </Link>
        <button
          className="nav-toggle"
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
        </button>
        <nav id="primary-navigation" className={`site-nav${open ? " site-nav--open" : ""}`} aria-label="Main navigation">
          {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}
          <Button href="/contact" className="nav-cta" showArrow={false} onClick={() => setOpen(false)}>Let&apos;s talk</Button>
        </nav>
      </div>
    </header>
  );
}

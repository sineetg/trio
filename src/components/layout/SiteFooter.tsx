import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <Link className="brand" href="/" aria-label="Trio Digitals home">
          <Image className="brand__image" src="/trio-digitals-logo.png" alt="" width={56} height={56} />
        </Link>
        <p>Copyright {new Date().getFullYear()} Trio Digitals</p>
        <nav className="site-footer__links" aria-label="Footer navigation">
          <Link href="/services">Services</Link>
          <Link href="/hospitality">Hospitality</Link>
          <Link href="/work">Work</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}

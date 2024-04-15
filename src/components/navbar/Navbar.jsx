"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status: sessionStatus } = useSession();
  const isAuthenticated = sessionStatus === "authenticated";
  const pathname = usePathname();

  const hideOnRoutes = ["/login", "/register"];
  const specialColorRoutes = ["/contact", "/send-card"];

  if (hideOnRoutes.includes(pathname)) {
    return null;
  }

  const isSpecialColorRoute = specialColorRoutes.includes(pathname);
  const logoImageSrc = isSpecialColorRoute ? "/brand-white.svg" : "/brand.svg";

  const navbarClasses = isSpecialColorRoute
    ? "flex items-center justify-between px-8 py-4 bg-darker-custom"
    : "flex items-center justify-between px-8 py-4"; // Default styles

  const linkClasses = isSpecialColorRoute
    ? "text-cream-custom hover:text-gray-300 font-bold text-lg"
    : "text-darkest-custom hover:text-gray-600 font-bold text-lg"; //Default styles

  if (sessionStatus === "loading") {
    return (
      <div className={navbarClasses} style={{ height: "50px" }}>
        <div className="flex items-center justify-center w-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <nav className={navbarClasses}>
      <Link href="/" passHref>
        <Image src={logoImageSrc} alt="Brand Logo" width={100} height={50} />
      </Link>

      <div className="flex items-center gap-14">
        <Link href="/about" className={linkClasses}>
          About
        </Link>
        <Link href="/contact" className={linkClasses}>
          Contact
        </Link>
        {isAuthenticated ? (
          <Link href="/my-profile" className={linkClasses}>
            My Profile
          </Link>
        ) : (
          <Link href="/register" className={linkClasses}>
            Register
          </Link>
        )}
      </div>

      <div>
        {isAuthenticated ? (
          <button
            onClick={() => signOut()}
            className="custom-button text-darkest-custom"
          >
            Sign out
          </button>
        ) : (
          <Link href="/login" className="custom-button">
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
}

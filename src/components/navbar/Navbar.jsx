"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { data: session, status: sessionStatus } = useSession();
  const isAuthenticated = sessionStatus === "authenticated";
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const hideOnRoutes = ["/login", "/register"];
  const specialColorRoutes = ["/contact", "/send-card"];

  if (hideOnRoutes.includes(pathname)) {
    return null;
  }

  const isSpecialColorRoute = specialColorRoutes.includes(pathname);
  const logoImageSrc = isSpecialColorRoute ? "/brand-white.svg" : "/brand.svg";
  const hamburgerImageSrc = isSpecialColorRoute
    ? "/hamburger-white.svg"
    : "/hamburger.svg";

  const navbarClasses = isSpecialColorRoute
    ? "flex items-center justify-between px-8 py-4 bg-darker-custom"
    : "flex items-center justify-between px-8 py-4"; // Default styles

  const linkClasses = isSpecialColorRoute
    ? "text-cream-custom hover:text-gray-300 font-bold text-lg"
    : "text-darkest-custom hover:text-gray-600 font-bold text-lg"; // Default styles

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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

      <div className="hidden lg:flex items-center gap-14">
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

      <div className="hidden lg:block">
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

      <div className="lg:hidden flex items-center">
        <button
          className="text-darkest-custom focus:outline-none"
          onClick={toggleMenu}
        >
          <Image src="./menu.svg" alt="Menu" width={30} height={30} />
        </button>
      </div>

      <div
        className={`lg:hidden flex flex-col items-center bg-white fixed top-0 left-0 p-4 space-y-4 w-full transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "transform translate-y-0" : "transform -translate-y-full"
        }`}
      >
        <Link
          href="/about"
          className={linkClasses}
          onClick={() => setIsMenuOpen(false)}
        >
          About
        </Link>
        <Link
          href="/contact"
          className={linkClasses}
          onClick={() => setIsMenuOpen(false)}
        >
          Contact
        </Link>
        {isAuthenticated ? (
          <Link
            href="/my-profile"
            className={linkClasses}
            onClick={() => setIsMenuOpen(false)}
          >
            My Profile
          </Link>
        ) : (
          <Link
            href="/register"
            className={linkClasses}
            onClick={() => setIsMenuOpen(false)}
          >
            Register
          </Link>
        )}
        {isAuthenticated ? (
          <button
            onClick={() => {
              signOut();
              setIsMenuOpen(false);
            }}
            className="custom-button text-darkest-custom mt-4"
          >
            Sign out
          </button>
        ) : (
          <Link
            href="/login"
            className="custom-button mt-4"
            onClick={() => setIsMenuOpen(false)}
          >
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
}

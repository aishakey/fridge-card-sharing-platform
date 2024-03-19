"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status: sessionStatus } = useSession();
  const isAuthenticated = sessionStatus === "authenticated";
  console.log("status", sessionStatus);
  console.log("session", session);

  const pathname = usePathname();

  const hideOnRoutes = ["/login", "/register"];

  if (hideOnRoutes.includes(pathname)) {
    return null;
  }

  if (sessionStatus === "loading") {
    return <div>Loading...</div>; // switch to loader
  }

  return (
    <nav className="flex items-center justify-between px-8 py-4">
      <Link href="/" passHref>
        <Image src="/brand.svg" alt="fridge" width={100} height={50} />
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-14">
        <Link
          href="/about"
          className="text-darkest-custom hover:text-gray-600 font-bold text-lg"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="text-darkest-custom hover:text-gray-600 font-bold text-lg"
        >
          Contact
        </Link>
        {isAuthenticated ? (
          <Link
            href="/my-profile"
            className="text-darkest-custom hover:text-gray-600 font-bold text-lg"
          >
            My Profile
          </Link>
        ) : (
          <Link
            href="/register"
            className="text-darkest-custom hover:text-gray-600 font-bold text-lg"
          >
            Register
          </Link>
        )}
      </div>

      {/* Authentication Button */}
      <div>
        {isAuthenticated ? (
          <button
            onClick={() => signOut()}
            className="custom-button text-darkest-custom"
          >
            Sign out
          </button>
        ) : (
          <Link href="/login" className="custom-button text-darkest-custom">
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
}

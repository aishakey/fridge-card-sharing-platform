import Link from "next/link";
import Image from "next/image";

const isAuthenticated = false; // This should be dynamically set based on  auth logic

export default function Navbar() {
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
          // Adjust as necessary to handle sign-out functionality
          <button className="custom-button text-darkest-custom">
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

import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center pt-28 h-screen text-center">
      <Image src="/404.svg" alt="Not Found" width={200} height={100} />
      <p className="text-lg text-darkest-custom pt-8">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className="mt-8 custom-button">
        Return Home
      </Link>
    </div>
  );
}

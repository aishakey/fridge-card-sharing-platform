import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex flex-col sm:flex-row justify-between items-stretch px-20 py-6 bg-cream-custom">
      <div>
        <Link href="/">
          <Image src="/brand.svg" alt="fridge" width={100} height={50} />
        </Link>
        <p className="text-xs py-4">
          Your Virtual Fridge: Where Memories Stick and
          <br /> Smiles Shine!
        </p>

        <div className="flex gap-4">
          <a href="https://youtube.com">
            <Image src="/youtube.png" alt="youtube" width={30} height={30} />
          </a>
          <a href="https://instagram.com">
            <Image src="/inst.png" alt="instagram" width={24} height={24} />
          </a>
          <a href="https://facebook.com">
            <Image src="/facebook.png" alt="facebook" width={24} height={24} />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-14 h-full">
        {/* First Column */}
        <div className="flex flex-col justify-center">
          <h3 className="text-darker-custom font-bold text-lg py-2">
            About Us
          </h3>
          <ul>
            <li className="mb-2">
              <Link href="/faq">FAQ</Link>
            </li>
            <li className="mb-2">
              <Link href="/reviews">Reviews</Link>
            </li>
            <li>
              <Link href="/help">Help & Support</Link>
            </li>
          </ul>
        </div>

        {/* Second Column */}
        <div className="flex flex-col justify-center">
          <h3 className="text-darker-custom font-bold text-lg py-2">
            Resources
          </h3>
          <ul>
            <li className="mb-2">
              <Link href="/pricing">Pricing</Link>
            </li>
            <li className="mb-2">
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/how-it-works">How It Works</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

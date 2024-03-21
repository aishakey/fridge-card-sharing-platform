import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="relative w-screen mt-6 flex justify-center items-center text-xxs sm:text-base md:text-xl font-bold text-black">
      <Image src="/profile-fridge.svg" alt="Fridge" width={830} height={800} />
      <div className="absolute candy-first">
        <Link href="/my-fridge" className="smooth-transition hover:opacity-50">
          My Fridge
        </Link>
      </div>
      <div className="absolute candy-second">
        <Link href="/my-cards" className="smooth-transition hover:opacity-50">
          My Cards
        </Link>
      </div>
      <div className="absolute candy-third">
        <Link href="/send-card" className="smooth-transition hover:opacity-50">
          Send Card
        </Link>
      </div>
    </div>
  );
}

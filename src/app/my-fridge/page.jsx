import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function MyFridgePage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }
  return (
    <div className="flex flex-col mt-6 md:mt-4 md:flex-row md:justify-around items-center px-10">
      <div className="flex flex-col gap-6 md:gap-14 mb-12 md:mb-0 items-center w-full md:order-2">
        <Link
          href="/my-cards"
          className="w-3/5 py-2 md:py-3 md:w-1/2 custom-button"
        >
          Delivered Cards
        </Link>
        <Link
          href="/send-card"
          className="w-3/5 py-2 md:py-3 md:w-1/2 custom-button"
        >
          Send Card
        </Link>
        <Link
          href="/my-cards"
          className="w-3/5 py-2 md:py-3 md:w-1/2 custom-button"
        >
          Received Cards
        </Link>
      </div>
      <div className="flex justify-center w-full md:order-1">
        <Image
          src="/empty-fridge.svg"
          alt="Green fridge"
          width={380}
          height={200}
        />
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFridgeCards } from "@/utils/FridgeCardsContext";

export default function MyFridgePage() {
  const { fridgeCards } = useFridgeCards();
  const { status: sessionStatus } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      router.push("/");
      return;
    }
  }, [sessionStatus, router]);

  if (sessionStatus === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-6 md:mt-4 md:flex-row md:justify-around items-center px-10">
      <div className="flex flex-col gap-6 md:gap-14 mb-12 md:mb-0 items-center w-full md:order-2">
        <Link
          href="/received-cards"
          className="w-3/5 py-2 md:py-3 md:w-1/2 custom-button"
        >
          Received Cards
        </Link>
        <Link
          href="/send-card"
          className="w-3/5 py-2 md:py-3 md:w-1/2 custom-button"
        >
          Send Card
        </Link>
        <Link
          href="/sent-cards"
          className="w-3/5 py-2 md:py-3 md:w-1/2 custom-button"
        >
          Delivered Cards
        </Link>
      </div>
      <div className="fridge-image-wrapper relative flex justify-center items-center w-full md:order-1">
        <Image
          src="/empty-fridge.svg"
          alt="Green fridge"
          layout="intrinsic"
          width={380}
          height={200}
        />
        <div
          className="absolute top-0 w-full h-full"
          style={{ maxWidth: "380px", maxHeight: "620px" }}
        >
          {Array.from({ length: 5 }).map((_, index) => {
            const card = fridgeCards.find(
              (card) => card.placeholderIndex === index
            );

            return (
              <div
                key={`placeholder-${index}`}
                className="placeholder"
                style={{
                  ...getPositionForIndex(index),
                  position: "relative",
                  width: "124px",
                  height: "100px",
                }}
              >
                {card ? (
                  <Image
                    src={card.image}
                    alt="Card on Fridge"
                    layout="fill"
                    objectFit="contain"
                  />
                ) : (
                  <Image
                    onClick={() => router.push("/received-cards")}
                    src="/brown-img.svg"
                    alt="Placeholder Icon"
                    layout="fixed"
                    width={50}
                    height={50}
                    className="cursor-pointer"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const getPositionForIndex = (index) => {
  const positions = [
    { top: "4%", left: "25%" },
    { top: "5%", left: "50%" },
    { top: "6%", left: "20%" },
    { bottom: "-34%", left: "30%" },
    { bottom: "4%", left: "42%" },
  ];
  return positions[index % positions.length];
};

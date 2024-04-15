"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFridgeCards } from "@/utils/FridgeCardsContext";

export default function MyFridgePage() {
  const { fridgeCards, removeCardFromFridge } = useFridgeCards();
  const [fullscreenImageUrl, setFullscreenImageUrl] = useState(null);
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
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

  const handleRemoveCardClick = (cardId) => {
    setSelectedCardId(cardId);
    setShowModal(true);
  };

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
                onMouseEnter={() => card && setHoveredImageIndex(index)}
                onMouseLeave={() => setHoveredImageIndex(null)}
              >
                {card ? (
                  <div
                    style={{
                      width: "90%",
                      height: "90%",
                      position: "relative",
                    }}
                    className="group"
                  >
                    <div
                      className="relative w-full h-full overflow-hidden cursor-pointer"
                      onClick={() => setFullscreenImageUrl(card.image)}
                    >
                      <Image
                        src={card.image}
                        alt="Card on Fridge"
                        layout="fill"
                        objectFit="cover"
                        className="transition duration-300 ease-in-out rounded border-[#7B3F00] border-2"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300" />
                    </div>
                    {hoveredImageIndex === index && (
                      <img
                        src="/suitcase.svg"
                        alt="Send back to received page"
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                        style={{ width: 40, height: 20 }}
                        onClick={() => handleRemoveCardClick(card._id)}
                      />
                    )}
                  </div>
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
      {fullscreenImageUrl && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setFullscreenImageUrl(null)}
        >
          <div
            className="max-w-3xl max-h-full p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={fullscreenImageUrl}
              alt="Fullscreen Image"
              className="max-w-full max-h-full rounded-lg"
              onClick={() => setFullscreenImageUrl(null)}
            />
          </div>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg">Confirm Removal</h2>
            <p>
              Do you want to send this card back to the received cards page?
            </p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="bg-cherry-main text-white py-2 px-4 rounded"
                onClick={() => {
                  removeCardFromFridge(selectedCardId);
                  setShowModal(false);
                }}
              >
                Confirm
              </button>
              <button
                className="bg-gray-300 py-2 px-4 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const getPositionForIndex = (index) => {
  const positions = [
    { top: "7%", left: "20%" },
    { top: "4%", left: "56%" },
    { top: "4%", left: "25%" },
    { bottom: "-32%", left: "30%" },
    { bottom: "4%", left: "50%" },
  ];
  return positions[index % positions.length];
};

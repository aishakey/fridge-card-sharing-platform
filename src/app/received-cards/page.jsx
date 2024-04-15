"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useFridgeCards } from "@/utils/FridgeCardsContext";

export default function ReceivedCards() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const { status: sessionStatus } = useSession();
  const router = useRouter();
  const { fridgeCards, addCardToFridge, removeCardFromFridge } =
    useFridgeCards();

  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      router.push("/");
      return;
    }
    // setIsLoading(true);
    fetch("/api/cards/received-cards")
      .then((response) => response.json())
      .then((data) => {
        setCards(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, [sessionStatus, router]);

  const openFullscreen = (image) => {
    setFullscreenImage(image);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  const handlePlaceOnFridge = (card) => {
    const isConfirmed = window.confirm(
      "Do you want to place this card on the fridge?"
    );
    if (isConfirmed) {
      const placeholderIndex = fridgeCards.length;
      if (placeholderIndex < 5) {
        addCardToFridge({ ...card, placeholderIndex });
        router.push("/my-fridge");
      } else {
        alert("You can only place a maximum of 5 cards on the fridge.");
      }
    }
  };

  const deleteCard = async (cardId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this card?"
    );
    if (!isConfirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/cards/${cardId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the card.");
      }

      removeCardFromFridge(cardId);

      setCards((currentCards) => {
        return currentCards.filter((card) => card._id.toString() !== cardId);
      });

      alert("Card was successfully deleted.");
    } catch (error) {
      console.error("Error deleting card:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="text-2xl font-bold">
          fridge <span className="animate-smile">&#58;&#41;</span>
        </div>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1>Sorry, you haven't received anything</h1>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto pb-12 pt-4 px-4 md:px-24">
      <h1 className="text-center font-custom-heading text-cream-custom text-4xl custom-stroke leading-tight pb-10">
        Let's see what you received
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
        {cards.map((card) => (
          <div
            key={card._id}
            className={`bg-cream-custom shadow-lg rounded-lg overflow-hidden ${
              fridgeCards.some((fridgeCard) => fridgeCard._id === card._id)
                ? "bg-gray-400"
                : ""
            }`}
          >
            <div
              className="relative group cursor-pointer"
              onClick={() => openFullscreen(card.image)}
              style={{ paddingBottom: "56.25%" }}
            >
              <Image
                src={card.image}
                alt="Received Card"
                layout="fill"
                objectFit="cover"
                className={`transition-opacity duration-500 ease-in-out group-hover:opacity-75 ${
                  fridgeCards.some((fridgeCard) => fridgeCard._id === card._id)
                    ? "opacity-50"
                    : ""
                }`}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-opacity duration-500 ease-in-out">
                <p className="text-white text-lg px-4">{card.text}</p>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">
                From: {card.sender.username}
              </h3>
              <p className="text-gray-600">
                Received on {new Date(card.sentTime).toLocaleDateString()}
              </p>
            </div>
            <div className="flex justify-between p-4">
              <button
                type="button"
                onClick={() => deleteCard(card._id)}
                className="focus:outline-none"
              >
                <Image
                  src="/gray-trash.svg"
                  alt="Trash"
                  width={24}
                  height={24}
                />
              </button>
              <button
                type="button"
                onClick={() => handlePlaceOnFridge(card)}
                className={`focus:outline-none ${
                  fridgeCards.some((fridgeCard) => fridgeCard._id === card._id)
                    ? "hidden"
                    : ""
                }`}
              >
                <Image src="/send-icon.svg" alt="Send" width={26} height={26} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {fullscreenImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4"
          onClick={closeFullscreen}
        >
          <img
            src={fullscreenImage}
            alt="Fullscreen"
            className="max-w-full max-h-full rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

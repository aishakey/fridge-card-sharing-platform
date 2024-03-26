"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ReviewSend({ onPrev, cardData }) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const router = useRouter();

  const handleConfirmAndSend = async () => {
    try {
      const cardResponse = await fetch("/api/send-card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: cardData.image,
          text: cardData.text,
          recipients: cardData.recipients,
        }),
      });

      if (!cardResponse.ok) {
        throw new Error("Failed to send the card.");
      }

      setShowSuccessModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    router.push("/my-fridge");
  };

  return (
    <div className="flex flex-col items-center mt-10 md:mt-12">
      {cardData.image && (
        <div className="relative w-full max-w-xl h-80 border-2 shadow-medl rounded-lg">
          <Image
            src={cardData.image}
            alt="Card Image"
            layout="fill"
            objectFit="contain"
          />
        </div>
      )}

      {cardData.text && (
        <div className="text-center text-cream-custom text-sm md:text-md pt-6 pb-2">
          {cardData.text}
        </div>
      )}

      <div className="w-full flex flex-wrap justify-center items-center pt-2 pb-8">
        <div className="text-center text-cream-custom font-bold mr-4">To:</div>
        <div className="flex flex-wrap justify-center gap-2">
          {cardData.recipients.map((recipient, index) => (
            <span key={index} className="text-yellow-main">
              {recipient}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6 pb-10 md:pb-12 md:flex-row md:gap-8 w-2/5 justify-center">
        <button
          onClick={onPrev}
          className="custom-button px-12 bg-darkest-custom text-cream-custom border-cream-custom shadow-light hover:bg-darker-custom"
        >
          Go Back
        </button>
        <button onClick={handleConfirmAndSend} className="custom-button">
          Confirm & Send
        </button>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="font-bold text-xl mb-2">Success!</h2>
            <p>Your card has been successfully sent.</p>
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleCloseSuccessModal}
                className="custom-button px-4 py-2 bg-bright-tangerine hover:bg-dark-tangerine text-white"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

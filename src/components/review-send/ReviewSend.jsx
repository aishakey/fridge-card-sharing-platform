"use client";

import { useState } from "react";
import Image from "next/image";

export default function ReviewSend({ onPrev, cardData }) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleConfirmAndSend = () => {
    // Logic to send the card goes here
    setShowSuccessModal(true);

    //navigate to a new page
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
        <div className="text-center text-cream-custom text-sm md:text-md pt-6 pb-6">
          {cardData.text}
        </div>
      )}

      <div className="w-full flex flex-wrap justify-center items-center pb-8">
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
                onClick={() => setShowSuccessModal(false)}
                className="button bg-green-500 hover:bg-green-700 text-white"
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

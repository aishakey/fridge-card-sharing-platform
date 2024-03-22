"use client";

import { useState } from "react";
import Image from "next/image";

export default function CreateCard({ onNext, onCardDataChange, cardData }) {
  const placeholderIcon = "/photo-icon.svg";
  const [imagePreview, setImagePreview] = useState(
    cardData.image || placeholderIcon
  );
  const [imageSelected, setImageSelected] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tempText, setTempText] = useState(cardData.text);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setImagePreview(fileUrl);
      onCardDataChange({ ...cardData, image: fileUrl });
      setImageSelected(true);
      setError("");
    }
  };

  const handleTextSubmit = () => {
    onCardDataChange({ ...cardData, text: tempText });
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleNext = () => {
    if (!imageSelected) {
      setError("Please select an image to proceed.");
      return;
    }
    onNext();
  };

  return (
    <div className="flex flex-col items-center mt-16">
      {error && <div className="text-cherry-main">{error}</div>}{" "}
      <div className=" flex w-full max-w-xl h-80 relative bg-dark-custom border-2 shadow-medl rounded-lg items-center justify-center">
        <Image src={imagePreview} alt="Card preview" width={80} height={80} />
      </div>
      <div className="flex gap-16 pt-16">
        <label className="mt-2 custom-button px-14 ">
          Choose File
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            required
          />
        </label>
        <button
          onClick={() => setShowModal(true)}
          className="mt-2 custom-button px-16"
        >
          Add Text
        </button>
      </div>
      {showModal && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-cream-custom p-4 rounded">
            <textarea
              value={tempText}
              onChange={(e) => setTempText(e.target.value)}
              className="mt-2 p-2 border rounded w-full"
            />
            <button
              onClick={handleTextSubmit}
              className="mt-2 p-2 border rounded bg-yellow-main font-bold"
            >
              Submit Text
            </button>
            <button
              onClick={handleCloseModal}
              className="p-2 border rounded bg-dark-custom text-cream-custom ml-2 font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="w-full flex justify-end mt-4">
        <button onClick={handleNext}>
          <Image
            src="/round-arrow-btn.svg"
            alt="Arrow"
            width={40}
            height={24}
          />
        </button>
      </div>
    </div>
  );
}

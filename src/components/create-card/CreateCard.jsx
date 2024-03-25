"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    // If cardData has an image but no local preview is set, update the preview
    if (cardData.image && !imagePreview) {
      setImagePreview(cardData.image);
    }
  }, [cardData.image, imagePreview]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "image/jpeg") {
      const fileUrl = URL.createObjectURL(file);
      setImagePreview(fileUrl);
      onCardDataChange({ ...cardData, image: fileUrl });
      setImageSelected(true);
      setError("");
    } else {
      setError("Please select a JPEG image.");
    }
  };

  const handleTextSubmit = () => {
    setShowModal(false);
    onCardDataChange({ ...cardData, text: tempText });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleNext = () => {
    if (!cardData.image) {
      setError("Please select an image to proceed.");
      return;
    }
    onNext();
  };

  return (
    <div className="flex flex-col items-center mt-10 md:mt-16">
      {error && <div className="text-cherry-main">{error}</div>}
      <div className="flex flex-col md:flex-row w-full max-w-xl justify-center items-center gap-4">
        <div className="h-80 w-full relative bg-dark-custom border-2 shadow-medl rounded-lg flex justify-center items-center">
          {imagePreview === placeholderIcon ? (
            <Image
              src={imagePreview}
              alt="Card preview"
              width={80}
              height={80}
            />
          ) : (
            <Image
              src={imagePreview}
              alt="Card preview"
              layout="fill"
              objectFit="contain"
            />
          )}{" "}
        </div>
        <button onClick={handleNext} className="self-center mt-6 md:mt-0">
          <Image
            src="/round-arrow-btn.svg"
            alt="Arrow"
            width={40}
            height={24}
          />
        </button>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:gap-8 pb-20 pt-8 md:pt-16 w-3/5 justify-center md:mr-12">
        <label className="mt-2 custom-button px-14 py-2 md:py-1">
          Choose File
          <input
            type="file"
            accept="image/jpeg"
            onChange={handleFileChange}
            className="hidden"
            required
          />
        </label>
        <button
          onClick={() => setShowModal(true)}
          className="mt-2 custom-button px-16 py-2 md:py-1"
        >
          Add Text
        </button>
      </div>

      {showModal && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-cream-custom w-full max-w-lg p-8 rounded">
            <textarea
              value={tempText}
              onChange={(e) => setTempText(e.target.value)}
              className="mt-2 p-4 h-40 border rounded w-full focus:outline-none resize-none"
            />
            <div className="flex justify-start space-x-2 mt-2">
              <div className="w-32">
                {" "}
                <button
                  onClick={handleTextSubmit}
                  className="w-full p-2 border rounded bg-yellow-main font-bold"
                >
                  Submit Text
                </button>
              </div>
              <div className="w-32">
                {" "}
                <button
                  onClick={handleCloseModal}
                  className="w-full p-2 border rounded bg-dark-custom text-cream-custom font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

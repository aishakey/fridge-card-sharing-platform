"use client";
import Image from "next/image";
import { useState } from "react";
import { reviews } from "@/utils/reviewData";

export default function UserReviews() {
  const [currentReview, setCurrentReview] = useState(0);

  const nextReview = () => {
    setCurrentReview((current) => (current + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview(
      (current) => (current - 1 + reviews.length) % reviews.length
    );
  };

  const prevIndex = (currentReview - 1 + reviews.length) % reviews.length;
  const nextIndex = (currentReview + 1) % reviews.length;

  return (
    <div className="w-full py-14 px-4 sm:px-6 flex flex-col items-center">
      <h2 className="font-custom-heading text-2xl sm:text-3xl md:text-4xl text-darkest-custom mb-12 text-center">
        Kind Words Corner
      </h2>
      <div className="bg-retro-yellow p-4 sm:p-6 rounded shadow-large border-2 border-darkest-custom max-w-xl md:max-w-2xl relative min-h-[20rem] md:min-h-[24rem] flex flex-col justify-between">
        {/* Left arrow */}
        <button
          onClick={prevReview}
          aria-label="Previous review"
          className="absolute inset-y-0 left-0 transform -translate-x-1/2 my-auto z-10"
        >
          <Image
            src="/arrow-btn.svg"
            alt="Previous"
            width={40}
            height={40}
            fixed="true"
            className="scale-x-[-1]"
          />
        </button>

        {/* Avatars */}
        <div className="flex justify-center items-center -mt-16 md:-mt-20">
          {/* Previous avatar */}
          <div className="relative rounded-full border-2 border-darkest-custom bg-white w-12 h-12 md:w-16 md:h-16 p-1 z-10 -mr-2 md:-mr-4">
            <Image
              src={reviews[prevIndex].img}
              alt={reviews[prevIndex].name}
              fill
              style={{
                objectFit: "cover",
              }}
              className="rounded-full p-2"
            />
          </div>
          {/* Current avatar */}
          <div className="relative rounded-full border-2 border-darkest-custom bg-white w-16 h-16 md:w-24 md:h-24 p-2 z-20">
            {" "}
            <Image
              src={reviews[currentReview].img}
              alt={reviews[currentReview].name}
              fill
              style={{
                objectFit: "cover",
              }}
              className="rounded-full p-2"
            />
          </div>
          {/* Next avatar */}
          <div className="relative rounded-full border-2 border-darkest-custom bg-white w-12 h-12 md:w-16 md:h-16 p-1 z-10 -ml-2 md:-ml-4">
            <Image
              src={reviews[nextIndex].img}
              alt={reviews[nextIndex].name}
              fill
              style={{
                objectFit: "cover",
              }}
              className="rounded-full p-2"
            />
          </div>
        </div>

        {/* Right arrow */}
        <button
          onClick={nextReview}
          aria-label="Next review"
          className="absolute inset-y-0 right-0 transform translate-x-1/2 my-auto z-10"
        >
          <Image
            src="/arrow-btn.svg"
            alt="Next"
            width={40}
            height={40}
            fixed="true"
          />
        </button>

        {/* Review text */}
        <div className="flex-grow flex flex-col justify-center items-center px-2 sm:px-10">
          <p className="text-base sm:text-lg text-center">
            {reviews[currentReview].text}
          </p>
          <p className="font-bold text-lg sm:text-xl mt-4 text-center text-darkest-custom">
            {reviews[currentReview].name}
          </p>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="flex flex-col sm:flex-row justify-around w-full sm:mt-8 px-6 pb-8 lg:pb-0 sm:px-12 gap-2 sm:gap-8">
      <div className="hidden lg:block">
        <Image
          src="/about-fridge.svg"
          alt="Green fridge"
          width={300}
          height={200}
          layout="intrinsic"
        />
      </div>
      <div className="flex flex-col items-center gap-8 max-w-xl">
        <h1 className="text-center font-custom-heading text-cream-custom text-3xl sm:text-4xl md:text-5xl custom-stroke">
          About Fridge
        </h1>
        <div className="flex flex-col justify-center items-center bg-cream-custom p-4 sm:p-6 rounded shadow-med border-2 border-darkest-custom">
          <p className="text-base sm:text-lg">
            At Fridge, we believe in the power of meaningful connections. Our
            journey began with a simple idea: to create a platform that makes it
            fun and easy to send and receive heartfelt greetings, no matter
            where you are in the world. Inspired by the joy of receiving a
            personalized card, our team set out to bring that same magic to the
            digital realm.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center bg-cream-custom p-4 sm:p-6 rounded shadow-med border-2 border-darkest-custom">
          <p className="text-base sm:text-lg">
            Our mission is to empower people to express themselves creatively,
            celebrate life's moments, and strengthen relationships through the
            art of greeting cards. We're passionate about providing a seamless
            and delightful user experience that brings smiles to faces and
            warmth to hearts.
          </p>
        </div>
      </div>
    </div>
  );
}

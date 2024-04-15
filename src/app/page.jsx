import Image from "next/image";
import Link from "next/link";
import UserReviews from "@/components/userReviews/UserReviews";
import { getServerSession } from "next-auth";

export default async function HomePage() {
  const session = await getServerSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center mt-8">
      {/* Heading */}
      <h1 className="font-custom-heading text-cream-custom text-4xl sm:text-5xl custom-stroke leading-tight">
        Create, Share, and Display
        <br /> Your Personalized Fridge, Online!
      </h1>
      <p className="sm:w-3/5 w-4/5 text-darker-custom">
        Design custom greeting cards, upload cherished memories, and showcase
        them on your virtual fridge for friends and family to see. Join our
        community and spread joy today!
      </p>

      {/*Buttons*/}
      <div className="flex flex-col sm:flex-row sm:justify-start gap-4 mt-6">
        <Link
          href={session ? "/my-profile" : "/register"}
          className="custom-button px-2 py-1 w-64 text-center"
        >
          {session ? "My profile" : "Create an account"}
        </Link>
        <Link
          href="/about"
          className="custom-button px-2 py-1 bg-retro-yellow hover:bg-yellow-main w-64 text-center"
        >
          Learn more
        </Link>
      </div>

      {/* Image */}
      <div className="mt-8 flex items-center justify-center">
        <div className="hidden sm:flex sm:mr-16">
          <Image
            src="/doodle.svg"
            alt="Doodle"
            width={150}
            height={50}
            className="scale-x-[-1]"
          />
        </div>
        <Image
          src="/cork-board.svg"
          alt="Cork board with polaroids of doodled users"
          width={560}
          height={200}
        />
        <div className="hidden sm:flex sm:ml-16">
          <Image src="/doodle.svg" alt="Doodle" width={150} height={50} />
        </div>
      </div>

      {/* Text block */}
      <div className="bg-cream-custom mt-14 w-full flex justify-center">
        <div className="w-11/12 flex flex-col items-center text-center my-10">
          <h1 className="text-darkest-custom font-custom-heading text-2xl sm:text-4xl md:text-5xl leading-snug sm:leading-normal md:leading-relaxed">
            Join a community where{" "}
            <span className="text-cherry-main">creativity</span> meets
            <span className="text-cherry-main"> connection.</span> Share your
            moments and discover a world of inspiration.{" "}
            <span className="text-cherry-main">Connect with friends </span>
            and loved ones by sending heartfelt cards that make every occasion
            special.
          </h1>
          <Link
            href="/register"
            className="custom-button mt-4 bg-yellow-main px-8 py-2 text-xl hover:bg-retro-yellow"
          >
            Find out more
          </Link>
        </div>
      </div>

      {/* Info block */}
      <div className="bg-darkest-custom text-cream-custom w-full sm:pt-20 pt-12 pb-16 px-6 text-center">
        <div className="flex justify-center items-center text-center gap-2 pb-10">
          <h2 className="font-custom-heading text-cream-custom text-4xl custom-stroke inline-block">
            Embark on your cardventure
          </h2>
          <Image
            src="/stars.svg"
            alt="Star decoration"
            width={60}
            height={60}
            className="hidden sm:inline-block -mt-16"
          />
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-12 lg:gap-28 mt-6">
          <div className="flex flex-col items-center">
            <Image
              src="/instruction-green.svg"
              alt="Create card instruction"
              width={190}
              height={80}
            />
            <h4 className="mt-4 font-semibold text-2xl">Create</h4>
            <ul className="list-disc text-left pl-5 mt-3 text-cold-gray">
              <li>Upload your own photo</li>
              <li>Add a heartfelt message</li>
            </ul>
          </div>

          <div className="flex flex-col items-center">
            <Image
              src="/instruction-orange.svg"
              alt="Send card instruction"
              width={190}
              height={80}
            />
            <h4 className="mt-4 font-semibold text-2xl">Send</h4>
            <ul className="list-disc text-left pl-5 mt-3 text-cold-gray">
              <li>Choose recipient</li>
              <li>Spread joy instantly</li>
            </ul>
          </div>

          <div className="flex flex-col items-center">
            <Image
              src="/instruction-cherry.svg"
              alt="Display card instruction"
              width={190}
              height={80}
            />
            <h4 className="mt-4 font-semibold text-2xl">Display</h4>
            <ul className="list-disc text-left pl-5 mt-3 text-cold-gray">
              <li>Display card on your fridge</li>
              <li>Share with friends and family</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 sm:mr-4 flex justify-center items-center">
          <div className="hidden sm:flex sm:mr-4 sm:mt-6">
            <Image
              src="/wavy-arrow.png"
              alt="Wavy arrow"
              width={160}
              height={60}
              className="scale-x-[-1]"
            />
          </div>
          <Link
            href="register"
            className="custom-button mt-16 bg-dark-tangerine text-cream-custom border-cream-custom shadow-light px-12 py-2 hover:bg-bright-tangerine"
          >
            Try it out
          </Link>
          <div className="hidden sm:flex sm:ml-4 sm:mt-6">
            <Image
              src="/wavy-arrow.png"
              alt="Wavy arrow"
              width={160}
              height={60}
            />
          </div>
        </div>
      </div>

      {/* User comments block */}
      <UserReviews />
    </div>
  );
}

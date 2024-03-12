import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center mt-4">
      {/* Heading */}
      <h1 className="font-custom-heading text-cream-custom text-5xl custom-stroke leading-tight">
        Create, Share, and Display
        <br /> Your Personalized Fridge, Online!
      </h1>
      <p className="w-3/5 text-darker-custom">
        Design custom greeting cards, upload cherished memories, and showcase
        them on your virtual fridge for friends and family to see. Join our
        community and spread joy today!
      </p>

      {/*Buttons*/}
      <div className="flex flex-col sm:flex-row sm:justify-start gap-4 mt-6">
        <Link href="/register" className="custom-button px-4 py-2">
          Create an account
        </Link>
        <Link
          href="/about"
          className="custom-button px-4 py-2 bg-retro-yellow hover:bg-yellow-main"
        >
          Learn more about
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
          layout="intrinsic"
        />
        <div className="hidden sm:flex sm:ml-16">
          <Image src="/doodle.svg" alt="Doodle" width={150} height={50} />
        </div>
      </div>

      {/* Text block */}
      <div className="bg-cream-custom mt-12 w-full flex justify-center">
        <div className="w-11/12 flex flex-col items-center text-center my-10">
          <h1 className="text-darkest-custom font-custom-heading text-3xl sm:text-4xl md:text-5xl leading-normal">
            Discover the magic of creating{" "}
            <span className="text-cherry-main">
              personalized birthday websites{" "}
            </span>
            for friends with our{" "}
            <span className="text-cherry-main">exclusive membership.</span>{" "}
            Spread joy and celebrate special moments with those who matter most.
          </h1>
          <Link
            href="/register"
            className="custom-button mt-4 bg-yellow-main px-4 py-2 hover:bg-retro-yellow"
          >
            Check out membership
          </Link>
        </div>
      </div>

      {/* Info block */}
      <div className="bg-darkest-custom text-cream-custom w-full pt-20 px-6 text-center">
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
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <div className="flex flex-col items-center">
            <Image
              src="/instruction-green.png"
              alt="Create card instruction"
              width={150}
              height={200}
            />
            <h4 className="mt-2 font-semibold">Create</h4>
            <ul>
              <li>Upload your own photo</li>
              <li>Add a heartfelt message</li>
            </ul>
          </div>

          <div className="flex flex-col items-center">
            <Image
              src="/instruction-orange.png"
              alt="Send card instruction"
              width={150}
              height={200}
            />
            <h4 className="mt-2 font-semibold">Send</h4>
            <ul>
              <li>Choose recipient</li>
              <li>Spread joy instantly</li>
            </ul>
          </div>

          <div className="flex flex-col items-center">
            <Image
              src="/instruction-cherry.png"
              alt="Display card instruction"
              width={150}
              height={200}
            />
            <h4 className="mt-2 font-semibold">Display</h4>
            <ul>
              <li>Display card on your fridge</li>
              <li>Share with friends and family</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex justify-center items-center">
          <div className="hidden sm:flex sm:mr-4">
            <Image
              src="/wavy-arrow.png"
              alt="Wavy arrow"
              width={120}
              height={60}
              className="scale-x-[-1]"
            />
          </div>
          <Link href="register" className="custom-button">
            Try it out
          </Link>
          <div className="hidden sm:flex sm:ml-4">
            <Image
              src="/wavy-arrow.png"
              alt="Wavy arrow"
              width={120}
              height={60}
            />
          </div>
        </div>
      </div>

      {/* User comments block */}
      <div className="mt-8 w-full py-12 px-6">
        <h2 className="font-custom-heading text-3xl">Kind Words Corner</h2>
        <div className="bg-retro-yellow mt-4 p-4 rounded shadow-md max-w-md mx-auto ">
          <p>
            “The process of creating and sending a personalized greeting card
            was incredibly easy and fun. The best part? Seeing the smile on my
            friend's face when they received the card and displayed it proudly
            on their digital fridge! This website has truly helped me stay
            connected with my loved ones in a special and meaningful way. I
            can't recommend it enough!"
          </p>
          <p>Annie Bell</p>
        </div>
      </div>
    </div>
  );
}

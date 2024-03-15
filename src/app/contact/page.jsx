import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen bg-darkest-custom flex flex-col items-center pt-6 pb-24">
      <h1 className="text-center font-custom-heading text-cream-custom text-3xl sm:text-4xl md:text-5xl custom-stroke mb-6">
        Let's get in touch
      </h1>
      <div className="flex flex-wrap justify-around gap-20 sm:gap-44">
        <div className="flex flex-col items-center justify-center ">
          <Image
            src="/dialog-box.svg"
            alt="Dialog box"
            width={380}
            height={380}
            className="mb-6"
          />
          <div className="grid grid-cols-2">
            {/* First Column */}
            <div className="flex flex-col justify-center items-center text-left text-cream-custom gap-6">
              <p>Phone</p>
              <p>Email</p>
              <p>Links</p>
            </div>
            {/* Second Column */}
            <div className="flex flex-col justify-center text-left text-yellow-main gap-6">
              <p>+(5) 555-555-555</p>
              <p>helpfridge@hello.com</p>
              <div className="flex gap-4">
                <a href="https://youtube.com">
                  <Image
                    src="/yt-yellow.png"
                    alt="youtube"
                    width={30}
                    height={30}
                  />
                </a>
                <a href="https://instagram.com">
                  <Image
                    src="/inst-yellow.png"
                    alt="instagram"
                    width={24}
                    height={24}
                  />
                </a>
                <a href="https://facebook.com">
                  <Image
                    src="/fb-yellow.png"
                    alt="facebook"
                    width={24}
                    height={24}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-darker-custom min-w-[29rem] max-h-[30rem] p-10 mt-12 rounded-lg shadow-medl border-2 border-cream-custom flex flex-col items-center justify-center max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-cream-custom">
            Contact Us
          </h2>
          <form className="w-full" action="#" method="POST">
            {/* Name field */}
            <div className="mb-6">
              <input
                className="appearance-none block w-full bg-cream-custom text-darkest-custom rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="name"
                type="text"
                placeholder="Name"
              />
            </div>
            {/* Email field */}
            <div className="mb-6">
              <input
                className="appearance-none block w-full bg-cream-custom text-darkest-custom rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="email"
                type="email"
                placeholder="Email"
              />
            </div>
            {/* Message field */}
            <div className="mb-6">
              <textarea
                className=" resize-none appearance-none block w-full bg-cream-custom text-darkest-custom rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="message"
                placeholder="Message"
                rows="4"
              ></textarea>
            </div>
            {/* Submit button */}
            <div className="text-center">
              <button
                className="custom-button px-16 bg-yellow-main"
                type="submit"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";

const AuthLayout = ({ children, imageSrc }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-cream-custom">
      <div className="md:w-2/5 hidden md:block relative">
        <Image src={imageSrc} alt="Auth" layout="fill" objectFit="cover" />
      </div>
      <div className="w-full md:w-3/5 flex flex-col justify-center items-center min-h-screen">
        <div className="w-full max-w-md px-4">
          <div className="self-start">
            {" "}
            <Link href="/" passHref>
              <Image src="/brand.svg" alt="fridge" width={90} height={45} />
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

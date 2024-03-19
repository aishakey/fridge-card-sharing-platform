"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/auth-layout/AuthLayout";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.replace("/my-profile");
    }
  }, [session, router]);

  if (session) return null; //switch to loader

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      console.error("Login error:", result.error);
      setError(result.error);
    } else {
      router.replace("/my-profile");
    }
  };

  const handleLoginWithGoogle = async () => {
    await signIn("google", { callbackUrl: "/my-profile" });
  };

  return (
    <AuthLayout imageSrc="/sitting-cat.svg">
      <div className="w-full max-w-md pt-2">
        <hr />
        <h1 className="text-4xl font-bold py-4">Sign in</h1>
        <p className="pb-4">
          Do not have an account?{" "}
          <Link href="/register" className="text-cherry-main font-bold pl-1">
            Sign up
          </Link>
        </p>
        <hr className="pb-6" />
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-4 rounded-xl bg-[#EBE4D3] placeholder-[#787878]"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-4 rounded-xl bg-[#EBE4D3] placeholder-[#787878]"
          />
          <button
            className="w-full py-2 custom-button bg-cherry-main text-cream-custom hover:bg-[#DC5053] font-semibold"
            type="submit"
          >
            Continue
          </button>
          <hr />
        </form>
        {error && <p className="text-red-600">{error}</p>}
        <div className="text-center">
          <p className="text-[#787878] my-4 text-lg">- or -</p>
          <button
            onClick={handleLoginWithGoogle}
            className="w-full py-4 bg-[#FED4C2] hover:bg-red-200 text-darkest-custom font-semibold rounded-lg flex justify-center items-center gap-4"
          >
            <Image src="/google.svg" alt="Google" width={20} height={20} />
            Sign in with Google
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}

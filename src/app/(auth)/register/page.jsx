"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import AuthLayout from "@/components/auth-layout/AuthLayout";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "An error occurred");
    } else {
      router.push("/my-profile");
    }
  };

  return (
    <AuthLayout imageSrc="/sleeping-cat.svg">
      <div className="w-full max-w-md pt-2">
        <hr />
        <h1 className="text-4xl font-bold py-4">Sign up</h1>
        <p className="pb-4">
          Already have an account?{" "}
          <Link href="/login" className="text-cherry-main font-bold pl-1">
            Sign in
          </Link>
        </p>
        <hr className="pb-6" />
        <form onSubmit={handleRegister} className="space-y-6">
          <input
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-4 rounded-xl bg-[#EBE4D3] placeholder-[#787878]"
          />
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
          <p className="text-[#787878] my-4 text-lg">or</p>

          <button
            onClick={handleRegister} //change to with Google
            className="w-full py-4 bg-[#FED4C2] hover:bg-red-200 text-darkest-custom font-semibold rounded-lg flex justify-center items-center gap-4 mb-6"
          >
            <Image src="/google.svg" alt="Google" width={20} height={20} />
            Register with Google
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}

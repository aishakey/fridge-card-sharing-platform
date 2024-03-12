"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    //Login with credentials
    const res = await fetch("api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "An error occurred");
    } else {
      router.push("/profile");
    }
  };

  const handleLoginWithGoogle = async () => {
    const result = await signIn("google", { callbackUrl: "/" });
    if (result.error) {
      setError(result.error);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Continue</button>
      </form>
      {error && <p>{error}</p>}
      <button onClick={handleLoginWithGoogle}>Sign In with Google</button>
    </div>
  );
}

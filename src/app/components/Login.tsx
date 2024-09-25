"use client";
import { useRouter } from "next/navigation";
import { Input } from "./Input";
import { login } from "@/apiCall/user";
import Cookies from "@/utils/cookie";
import { useEffect, useState } from "react";

export const LoginComponent = () => {
  const userId = Cookies.getCookieCall("userId");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (userId) {
      router.push("/message");
    }
  }, [userId]);

  const loginCall = async () => {
    setError("");
    const loginStatus = await login(username, password);
    if (loginStatus === 200) {
      Cookies.setCookieCall("userId", username);
      router.push("/message");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Welcome Notfication Service!</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <Input
          name="username"
          value={username}
          label="Username"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
        <Input
          name="password"
          type="password"
          value={password}
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <button
          className="bg-blue-600 p-2 w-full text-white rounded hover:bg-blue-700 transition duration-200 font-semibold mt-4"
          onClick={loginCall}
        >
          Log In
        </button>
      </div>
    </div>
  );
};

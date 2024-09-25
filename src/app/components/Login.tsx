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
  const router = useRouter();

  useEffect(() => {
    if (userId) {
      router.push("/message");
    }
  });

  const loginCall = async () => {
    const user = username;
    const pass = password;
    const loginStatus = await login(user, pass);
    if (!userId) {
      if (loginStatus === 200) {
        Cookies.setCookieCall("userId", user);
        router.push("/message");
      }
    }
  };

  return (
    <div>
      <Input
        name="username"
        value={username}
        label="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        name="password"
        value={password}
        label="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-500 p-2 w-full text-white rounded"
        onClick={loginCall}
      >
        LogIn
      </button>
    </div>
  );
};

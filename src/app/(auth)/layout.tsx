"use client";
import { checkUserRole } from "@/apiCall/user";
import Cookies from "@/utils/cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoad, setIsLoad] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const result = Cookies.getCookieCall("userId");
    if (result) {
      console.log("Result From layout::", result);
      checkUserRole(result).then((data) => {
        if (data.role === "none") {
          router.push("/");
        } else {
          setIsLoad(false);
        }
      });
    } else {
      router.push("/");
    }
  });

  return isLoad ? <div>Loading...</div> : <div>{children}</div>;
}

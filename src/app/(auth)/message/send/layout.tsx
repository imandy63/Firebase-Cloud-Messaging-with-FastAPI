"use client";
import { checkUserRole } from "@/apiCall/user";
import Cookies from "@/utils/cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoad, setIsLoad] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const result = Cookies.getCookieCall("userId");
    if (result) {
      checkUserRole(result).then((data) => {
        console.log(data);
        if (data !== "admin") {
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

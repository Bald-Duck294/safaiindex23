"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("cleaner_user");

    if (!user) {
      router.replace("/login"); // not logged in
    } else {
      router.replace("/completed-tasks"); // logged in
    }
  }, []);

  return null; // Optional: loader or blank
}

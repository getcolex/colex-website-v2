"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";

export default function VerifyEmailPage() {
  const router = useRouter();

  useEffect(() => {
    const email = window.localStorage.getItem("emailForSignIn");

    if (isSignInWithEmailLink(auth, window.location.href) && email) {
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          console.log("✅ Logged in with email link:", result.user);
          window.localStorage.removeItem("emailForSignIn");
          router.push("/dashboard");
        })
        .catch((error) => {
          console.error("❌ Error signing in:", error);
        });
    } else {
      console.warn("Missing email or invalid link");
    }
  }, [router]);

  return <p>Verifying...</p>;
}

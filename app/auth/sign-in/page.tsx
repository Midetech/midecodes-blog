// app/auth/signin/page.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Moon, Rocket, Stars } from "lucide-react";

import { postMethod } from "@/services/http-requests";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  //   const handleEmailSignIn = async () => {
  //     setIsLoading(true);
  //     await signIn("email", { email }).then((res: any) => {
  //       if (res.error) {
  //         setMessage(res.error);
  //       }
  //       setIsLoading(false);
  //     });
  //   };

  const handleEmailSignIn = async () => {
    try {
      //   const response = await fetch("/api/auths", {
      //     method: "POST",
      //     // headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ email }),
      //   });

      const response = await postMethod({
        route: "/auths",
        payload: { email },
      });
      const data = await response.json();
      setMessage(data.message || data.error);
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <Stars
            className="text-white opacity-20 absolute top-4 left-4"
            size={24}
          />
          <Stars
            className="text-white opacity-20 absolute top-1/2 right-8"
            size={32}
          />
          <Stars
            className="text-white opacity-20 absolute bottom-8 left-1/2"
            size={28}
          />
          <Moon
            className="text-gray-300 opacity-30 absolute top-1/4 right-1/4"
            size={48}
          />
        </div>

        <div className="relative">
          <div className="text-center">
            <Rocket className="mx-auto h-16 w-16 text-indigo-400" />
            <h2 className="mt-6 text-3xl font-extrabold text-white">
              Launch into Your Account
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Enter your email to receive a magic link
            </p>
          </div>

          <form
            className="mt-8 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleEmailSignIn();
            }}
          >
            <Input
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-700"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading
                  ? "bg-indigo-600"
                  : "bg-indigo-500 hover:bg-indigo-600"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <Rocket className="h-5 w-5 text-indigo-300 animate-bounce" />
                </span>
              ) : null}
              {isLoading ? "Launching..." : "Send Magic Link"}
            </Button>
          </form>

          {message && (
            <div className="mt-4 text-sm text-green-400 text-center">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
    // <div>
    //   <h1>Sign In</h1>
    //   <form
    //     onSubmit={(e) => {
    //       e.preventDefault();
    //       const email = (e.target as any).email.value;
    //       handleEmailSignIn(email);
    //     }}
    //   >
    //     <input type="email" name="email" placeholder="Email address" required />
    //     <button type="submit">Sign In with Email</button>
    //   </form>
    // </div>
  );
}

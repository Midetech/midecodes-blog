"use client";
import React from "react";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const LoginError = ({ searchParams }: { searchParams: { error: string } }) => {
  const navigate = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-0 top-0 h-16 w-16 bg-red-500 rounded-full filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute right-0 bottom-0 h-16 w-16 bg-orange-500 rounded-full filter blur-xl opacity-20 animate-pulse"></div>
        </div>

        <div className="relative">
          <div className="text-center">
            <div className="mx-auto h-24 w-24 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
              <AlertCircle className="h-16 w-16 text-white" />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-white">
              Houston, We Have a Problem
            </h2>
            <p className="mt-2 text-sm text-red-400">{searchParams.error}</p>
          </div>

          <div className="mt-8 space-y-4">
            <Button
              //   onClick={onRetry}
              className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry Launch
            </Button>

            <Button
              onClick={() => navigate.push("/auth/sign-in")}
              variant="outline"
              className="w-full flex items-center justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-transparent hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Home className="mr-2 h-4 w-4" />
              Return to Mission Control
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400">
              If the problem persists, please contact our space station support
              team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginError;

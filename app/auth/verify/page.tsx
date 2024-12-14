import React from "react";
import { Mail } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const MagicLinkSentScreen = ({ email }: { email: string }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Mail className="mx-auto h-12 w-12 text-blue-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Check your email
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a magic link to {email}
          </p>
        </div>

        <Alert className="mt-8">
          <AlertTitle>What to do next:</AlertTitle>
          <AlertDescription>
            <ol className="list-decimal list-inside space-y-2 mt-2">
              <li>Check your email inbox for the magic link</li>
              <li>Click on the link to log in automatically</li>
              <li>If you don't see the email, check your spam folder</li>
            </ol>
          </AlertDescription>
        </Alert>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Didn't receive the email?
            <button className="ml-1 text-blue-500 hover:text-blue-600 focus:outline-none focus:underline">
              Click here to resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MagicLinkSentScreen;

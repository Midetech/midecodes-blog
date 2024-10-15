"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Mail, Github } from "lucide-react";
import { Icons } from "@/components/icons";

const LoginSignup = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => setEmail(e.target.value);

  const handleMagicLinkLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Magic link login with:", email);
    // Implement magic link logic here
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // Implement Google login logic here
  };

  const handleGithubLogin = () => {
    console.log("GitHub login clicked");
    // Implement GitHub login logic here
  };

  const handleSignup = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const signupData = Object.fromEntries(formData);
    console.log("Signup data:", signupData);
    // Implement signup logic here
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const loginData = Object.fromEntries(formData);
    console.log("Login data:", loginData);
    window.location.href = "/post/create";
    // Implement login logic here
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
          <CardDescription>Login or create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Signup</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      name="email"
                      type="email"
                      placeholder="Your email"
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      name="password"
                      type="password"
                      placeholder="Your password"
                      required
                    />
                  </div>
                </div>
                <Button className="w-full mt-4" type="submit">
                  Login
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleSignup}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="signup-name">Name</Label>
                    <Input
                      id="signup-name"
                      name="name"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      placeholder="Your email"
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      name="password"
                      type="password"
                      placeholder="Choose a password"
                      required
                    />
                  </div>
                </div>
                <Button className="w-full mt-4" type="submit">
                  Sign Up
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4 w-full">
            <Button variant="outline" onClick={handleMagicLinkLogin}>
              <Mail className="h-5 w-5" />
            </Button>
            <Button variant="outline" onClick={handleGoogleLogin}>
              <Icons.google className="h-5 w-5" />
            </Button>
            <Button variant="outline" onClick={handleGithubLogin}>
              <Icons.gitHub className="h-5 w-5" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginSignup;

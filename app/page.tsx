"use client";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const page = () => {
  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [aiResponse, setAiResponse] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const CLAUDE_API_URL = "https://api.anthropic.com/v1/complete";
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setAiResponse("");
    try {
      const response = await fetch("/api/ai-consult", {
        method: "POST",
        body: JSON.stringify(inputValue),
      });

      const data = await response.json();
      console.log(data);

      setIsLoading(false);
      if (data.status) {
        setAiResponse(data);
      } else {
        setError(data?.error?.message);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
      setError(error?.message);
    }
  };
  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col gap-y-5">
      <p className="text-red-600">{error}</p>
      <form
        onSubmit={handleSubmit}
        className="border p-5 flex flex-col  items-center w-1/3 gap-y-5 rounded-sm"
      >
        <Textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter your text here"
          className="h-[100px]"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Icons.spinner className="w-4 h-4 animate-spin" />}
          Submit
        </Button>
      </form>

      <div className="border w-1/3 h-[250px] p-2 rounded-sm">
        <h1>Response</h1>

        {aiResponse && <div>{JSON.stringify(aiResponse)}</div>}
      </div>
    </div>
  );
};

export default page;

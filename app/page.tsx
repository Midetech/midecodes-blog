"use client";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import React from "react";
import { SendMailClient } from "zeptomail";
import Anthropic from "@anthropic-ai/sdk";
import KanbanBoard from "./kanban/page";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true,
});

type uploadStatus = "idle" | "loading" | "success" | "error";

const page = () => {
  const [uploadStatus, setUploadStatus] = React.useState<uploadStatus>("idle");
  const [file, setFile] = React.useState<File | null>(null);
  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [aiResponse, setAiResponse] = React.useState("");
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [error, setError] = React.useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const CLAUDE_API_URL = "https://api.anthropic.com/v1/complete";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setAiResponse("");
    try {
      const msg = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        messages: [{ role: "user", content: inputValue }],
      });
      console.log(msg);

      // const response = await fetch("/api/ai-consult", {
      //   method: "POST",
      //   body: JSON.stringify(inputValue),
      // });

      // const data = await response.json();
      // console.log(data);

      setIsLoading(false);
      // if (data.status) {
      //   setAiResponse(data);
      // } else {
      //   setError(data?.error?.message);
      // }
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
      setError(error?.message);
    }
  };

  const url = "api.zeptomail.com/";
  const token =
    "Zoho-enczapikey wSsVR60j/hH3C/grnzP/de8/kF8ADgn0QE563VKm7XKtGaqXosdolEycBlD0H/FJQmJoRjVHorwszBkF1jQHj45+zVoAACiF9mqRe1U4J3x17qnvhDzPV2RZkReJLo4Bzw1rnWdiF8Ak+g==";

  let client = new SendMailClient({ url, token });

  const handleSendMail = async () => {
    try {
      client
        .sendMail({
          from: {
            address: "noreply@mide.codes",
            name: "noreply",
          },
          to: [
            {
              email_address: {
                address: "faginorish@gmail.com",
                name: "Sunday",
              },
            },
          ],
          subject: "Test Email",
          htmlbody: "<div><b> Test email sent successfully.</b></div>",
        })
        .then((resp: any) => console.log("success", resp))
        .catch((error: any) => console.log("error", error));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileUpload = async () => {
    if (!file) return;
    setUploadStatus("loading");
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", file);

      await axios.post("https://httpbin.org/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },

        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total
            ? Math.round((progressEvent.loaded / progressEvent.total) * 100)
            : 0;
          setUploadProgress(progress);
        },
      });

      setUploadStatus("success");
      setUploadProgress(100);
    } catch (error: any) {
      console.log(error);
      setUploadStatus("error");
      setUploadProgress(0);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col gap-4 p-4">
      <h1>Some Notable Stuff here</h1>
      <div className="w-full flex justify-center items-center gap-4">
        <p className="text-red-600">{error}</p>
        <form
          onSubmit={handleSubmit}
          className="border p-5 flex flex-col w-full items-center md:w-1/3 gap-y-5 rounded-sm"
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

        {aiResponse && (
          <div className="border w-1/3 h-[50px] p-2 rounded-sm">
            <h1>Response</h1>

            <div>{JSON.stringify(aiResponse)}</div>
          </div>
        )}

        <div className="border p-5 flex flex-col  items-center md:w-1/3 gap-y-5 rounded-sm w-full">
          <p className="text-2xl font-bold">File Upload with upload progress</p>

          <Input type="file" onChange={handleFileChange} />

          <Button
            onClick={handleFileUpload}
            disabled={!file || uploadStatus === "loading"}
          >
            Upload
          </Button>

          {uploadStatus === "success" && (
            <p className="text-green-600">File Upload successful</p>
          )}

          {uploadStatus === "error" && (
            <p className="text-red-600">File Upload failed</p>
          )}

          {uploadStatus === "loading" && (
            <div className="space-y-2 w-full">
              <div className="h-2.5 w-full bg-slate-300 rounded-full">
                <div
                  className="h-2.5 bg-green-700 rounded-full transition-all duration-300"
                  style={{
                    width: `${uploadProgress}%`,
                  }}
                ></div>
              </div>
              <p className="text-center">{uploadProgress}%</p>
            </div>
          )}
          {file && (
            <div>
              <p>
                <b>Name:</b>
                {file.name}
              </p>
              <p>
                <b>Size:</b>
                {Math.round(file.size / 1024).toFixed(2)}KM
              </p>
              <p>
                <b>Type:</b>
                {file.type}
              </p>
            </div>
          )}
        </div>
      </div>

      <KanbanBoard />
    </div>
  );
};

export default page;

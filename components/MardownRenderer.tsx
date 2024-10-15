// components/MarkdownRenderer.js
import { cn } from "@/lib/utils";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      children={content}
      remarkPlugins={[remarkGfm]}
      components={{
        // Customize rendering for code blocks
        code({ node, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          const inline = false; // Set inline to false as a workaround
          return match ? (
            <SyntaxHighlighter
              style={vscDarkPlus} // Use the style directly without spreading
              language={match[1]}
              PreTag="div"
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code
              className={cn("bg-slate-300 px-2 rounded-sm", className)}
              {...props}
            >
              {children}
            </code>
          );
        },
        // Customize rendering for headings
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold my-4">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-semibold my-3">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-medium my-2">{children}</h3>
        ),
        // Customize rendering for paragraphs
        p: ({ children }) => <p className="my-5">{children}</p>,
        // Add more customizations as needed
      }}
    />
  );
};

export default MarkdownRenderer;

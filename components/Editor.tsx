import React, { useState, useRef, useEffect } from "react";
import { Bold, Italic, List, ListOrdered, Code, Link } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MarkdownEditorProps {
  onSubmit: (markdown: string) => void;
}

interface FormatState {
  bold: boolean;
  italic: boolean;
  unorderedList: boolean;
  orderedList: boolean;
  code: boolean;
  link: boolean;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ onSubmit }) => {
  const [markdown, setMarkdown] = useState("");
  const [formatState, setFormatState] = useState<FormatState>({
    bold: false,
    italic: false,
    unorderedList: false,
    orderedList: false,
    code: false,
    link: false,
  });
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const applyFormatting = (format: string) => {
    if (!editorRef.current) return;

    const start = editorRef.current.selectionStart;
    const end = editorRef.current.selectionEnd;
    const selectedText = markdown.substring(start, end);
    let formattedText = "";
    let cursorOffset = 0;

    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`;
        cursorOffset = 2;
        break;
      case "italic":
        formattedText = `*${selectedText}*`;
        cursorOffset = 1;
        break;
      case "unorderedList":
        formattedText = selectedText
          .split("\n")
          .map((line) => `- ${line}`)
          .join("\n");
        cursorOffset = 2;
        break;
      case "orderedList":
        formattedText = selectedText
          .split("\n")
          .map((line, index) => `${index + 1}. ${line}`)
          .join("\n");
        cursorOffset = 3;
        break;
      case "code":
        formattedText = selectedText.includes("\n")
          ? "```\n" + selectedText + "\n```"
          : "`" + selectedText + "`";
        cursorOffset = selectedText.includes("\n") ? 4 : 1;
        break;
      case "link":
        const url = prompt("Enter the URL:");
        if (url) {
          formattedText = `[${selectedText}](${url})`;
          cursorOffset = 3 + selectedText.length + url.length;
        }
        break;
    }

    const newMarkdown =
      markdown.substring(0, start) + formattedText + markdown.substring(end);
    setMarkdown(newMarkdown);

    // Set cursor position after formatting
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.focus();
        editorRef.current.setSelectionRange(
          start + cursorOffset,
          start + cursorOffset
        );
      }
    }, 0);

    updateFormatState();
  };

  const updateFormatState = () => {
    if (!editorRef.current) return;

    const start = editorRef.current.selectionStart;
    const end = editorRef.current.selectionEnd;
    const selectedText = markdown.substring(start, end);
    const surroundingText = markdown.substring(
      Math.max(0, start - 10),
      Math.min(markdown.length, end + 10)
    );

    setFormatState({
      bold: /\*\*.*\*\*/.test(surroundingText),
      italic: /(?<!\*)\*(?!\*).*(?<!\*)\*(?!\*)/.test(surroundingText),
      unorderedList: /^- /.test(selectedText) || /\n- /.test(surroundingText),
      orderedList:
        /^\d+\. /.test(selectedText) || /\n\d+\. /.test(surroundingText),
      code:
        /`.*`/.test(surroundingText) || /```[\s\S]*```/.test(surroundingText),
      link: /\[.*\]\(.*\)/.test(surroundingText),
    });
  };

  const handleSubmit = () => {
    onSubmit(markdown);
  };

  const getButtonClass = (isActive: boolean) => {
    return `${
      isActive ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
    } hover:bg-blue-600 hover:text-white`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-2 flex space-x-2">
        <Button
          type="button"
          onClick={() => applyFormatting("bold")}
          className={getButtonClass(formatState.bold)}
        >
          <Bold size={18} />
        </Button>
        <Button
          type="button"
          onClick={() => applyFormatting("italic")}
          className={getButtonClass(formatState.italic)}
        >
          <Italic size={18} />
        </Button>
        <Button
          type="button"
          onClick={() => applyFormatting("unorderedList")}
          className={getButtonClass(formatState.unorderedList)}
        >
          <List size={18} />
        </Button>
        <Button
          type="button"
          onClick={() => applyFormatting("orderedList")}
          className={getButtonClass(formatState.orderedList)}
        >
          <ListOrdered size={18} />
        </Button>
        <Button
          type="button"
          onClick={() => applyFormatting("code")}
          className={getButtonClass(formatState.code)}
        >
          <Code size={18} />
        </Button>
        <Button
          type="button"
          onClick={() => applyFormatting("link")}
          className={getButtonClass(formatState.link)}
        >
          <Link size={18} />
        </Button>
      </div>
      <textarea
        ref={editorRef}
        className="w-full h-64 p-2 border rounded font-mono"
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        onSelect={updateFormatState}
        onKeyUp={updateFormatState}
        onMouseUp={updateFormatState}
      />
      <Button onClick={handleSubmit} className="mt-2">
        Submit
      </Button>
    </div>
  );
};

export default MarkdownEditor;

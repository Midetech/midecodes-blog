"use client";
import { Icons } from "@/components/icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { postMethod } from "@/services/http-requests";
import { AlertCircle, Image as ImageIcon, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
const MarkdownEditor = dynamic(() => import("@/components/MarkdownEditor"), {
  ssr: false,
});

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<string>(`
Hello **world**!
`);
  const [tags, setTags] = useState<any>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [image, setImage] = useState<any>(null);
  const [error, setError] = useState("");
  const navigate = useRouter();

  const handleTitleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => setTitle(e.target.value);
  const handleContentChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => setContent(e.target.value);
  const handleCurrentTagChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => setCurrentTag(e.target.value);

  const handleAddTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: any) => {
    setTags(tags.filter((tag: any) => tag !== tagToRemove));
  };

  const [uploadUrl, setUploadUrl] = useState<string | null>(null);

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (file && file.type.substring(0, 5) === "image") {
      setImage(file);

      const reader = new FileReader();
      reader.readAsDataURL(file); // Convert file to base64

      reader.onloadend = async () => {
        const base64String = reader.result as string; // Get base64 string

        try {
          const res = await fetch("/api/cloudinary", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: base64String }), // Send base64 string as `data`
          });

          const data = await res.json();
          if (res.ok) {
            setUploadUrl(data.url); // Set uploaded URL
          } else {
            setError(data.error || "Upload failed");
          }
        } catch (uploadError) {
          setError("Error uploading file");
        }
      };

      reader.onerror = () => {
        setError("Error reading file");
      };
    } else {
      setError("Please select an image file.");
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    try {
      await postMethod({
        route: "/posts",
        payload: {
          title,
          content,
          tags,
          image: uploadUrl,
          author: "Sunday Olomitutu",
        },
      });
      setLoading(false);
      navigate.push("/posts");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>Create a New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter your post title"
                  value={title}
                  onChange={handleTitleChange}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="content">Content</Label>
                {/* 
                <Editor
                  value={content}
                  onTextChange={(e: EditorTextChangeEvent) => {
                    setContent(e.textValue as string);
                  }}
                  style={{ height: "320px" }}
                /> */}

                <MarkdownEditor markdown={content} setContent={setContent} />
                {/* <MarkdownEditor
                  id="content"
                  placeholder="Write your post content here"
                  value={content}
                  onChange={handleContentChange}
                  required
                /> */}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="tags"
                    placeholder="Add a tag"
                    value={currentTag}
                    onChange={handleCurrentTagChange}
                  />
                  <Button type="button" onClick={handleAddTag}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="px-2 py-1">
                      {tag}
                      <X
                        className="ml-1 h-3 w-3 cursor-pointer"
                        onClick={() => handleRemoveTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="image">Image</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="image"
                    type="file"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Label
                    htmlFor="image"
                    className="cursor-pointer flex items-center justify-center w-full h-32 border-2 border-dashed rounded-md"
                  >
                    {image ? (
                      <div className="relative w-full h-full">
                        <img
                          src={URL.createObjectURL(image)}
                          alt="Uploaded"
                          className="w-full h-full object-cover rounded-md"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={handleRemoveImage}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                        <span className="mt-2 text-sm text-gray-500">
                          Upload an image
                        </span>
                      </div>
                    )}
                  </Label>
                </div>
              </div>
            </div>
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button
              type="submit"
              disabled={loading || !title || !content || !tags}
              className="w-full mt-4"
            >
              {loading && <Icons.spinner className="animate-spin" />}
              Create Post
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePost;

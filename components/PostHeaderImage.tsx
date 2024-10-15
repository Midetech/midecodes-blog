import React from "react";
import Image from "next/image";
import { Clock, Timer } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";

interface BlogHeaderImageProps {
  imageUrl: string;
  title: string;
  author: string;
  date: string;
  category?: string;
  readTime: number; // in minutes
}

const BlogHeaderImage: React.FC<BlogHeaderImageProps> = ({
  imageUrl,
  title,
  author,
  date,
  category,
  readTime,
}) => {
  return (
    <div className="relative w-full h-[400px] mb-8">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
      <div className="absolute inset-0 flex flex-col justify-end p-4 lg:p-8">
        {category && (
          <span className="text-xs font-semibold text-white bg-blue-500 px-2 py-1 rounded-full mb-4 self-start">
            {category}
          </span>
        )}
        <h1 className="lg:text-4xl text-xl font-bold text-white mb-4">
          {title}
        </h1>
        <div className="flex lg:items-center lg:justify-between flex-col lg:flex-row text-white gap-y-3">
          <div className="flex items-center mr-6">
            <div className="relative w-10 h-10 mr-3 text-black">
              <Avatar>
                {/* <AvatarImage src={post.authorAvatar} alt={post?.author} /> */}
                <AvatarFallback>
                  {author
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="w-full">
              <p className="font-semibold text-[12px] lg:text-lg">{author}</p>
              <p className="text-sm opacity-75">{date}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            <Badge
              variant="secondary"
              className="text-sm text-gray-500 flex items-center gap-x-2"
            >
              <Timer />
              <p> {readTime} min read</p>
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHeaderImage;

"use client";
import { EmptyPostList } from "@/components/EmptyPostList";
import { Icons } from "@/components/icons";
import MarkdownRenderer from "@/components/MardownRenderer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IPost } from "@/interfaces/post.interface";
import { getMethod } from "@/services/http-requests";
import { Calendar, MessageSquare, ThumbsUp, Timer, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PostsList = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [sortBy, setSortBy] = useState("date");
  const [filterTag, setFilterTag] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useRouter();

  const handleSort = (value: any) => {
    setSortBy(value);
    const sortedPosts = [...posts].sort((a, b) => {
      if (value === "date")
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      if (value === "likes") return (b.likes || 0) - (a.likes || 0);
      if (value === "comments")
        return (b.comments.length || 0) - (a.comments.length || 0);
      return 0;
    });
    setPosts(sortedPosts);
  };

  const handleFilter = (e: { target: { value: string } }) => {
    const tag = e.target.value.toLowerCase();
    setFilterTag(tag);
    if (tag) {
      const filteredPosts = posts.filter((post) =>
        post.tags.some((t) => t.toLowerCase().includes(tag))
      );
      setPosts(filteredPosts);
    } else {
      setPosts(posts);
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      const res = await getMethod({
        queryKey: [
          "posts",
          {
            route: "/posts",
            params: {},
          },
        ],
      });
      setLoading(false);
      setPosts(res);
    };
    getPosts();
  }, []);

  if (!loading && !posts.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <EmptyPostList onCreatePost={() => navigate.push("/posts/create")} />
      </div>
    );
  }
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-y-3">
        <h1 className="text-xl lg:text-2xl font-bold">Some Articles</h1>
        <div className="flex space-x-2">
          <Select onValueChange={handleSort} defaultValue={sortBy}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="likes">Likes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={() => navigate.push("/posts/create")}>
          Create Post
        </Button>
      </div>
      {loading && (
        <div className="min-h-screen w-full flex items-center justify-center">
          <Icons.spinner className="w-20 h-20 animate-spin" />
        </div>
      )}

      {!loading && posts.length && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <Card key={post._id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <div className="flex items-center text-sm text-gray-500">
                  <User className="w-4 h-4 mr-1" />
                  Sunday Olomitutu
                  <Calendar className="w-4 h-4 ml-4 mr-1" />
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
              </CardHeader>
              <CardContent>
                <MarkdownRenderer content={post.content.substring(0, 100)} />
                <div className="flex flex-wrap gap-1">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="mt-auto">
                <div className="flex justify-between items-center w-full text-sm text-gray-500">
                  <span className="flex items-center">
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    {post.likes}
                  </span>
                  <span className="flex items-center">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    {post.comments?.length}
                  </span>

                  <span className="flex items-center">
                    <Timer className="w-4 h-4 mr-1" />
                    {Math.ceil(post.content.split(" ").length / 200)} min read
                  </span>

                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => navigate.push(`/posts/${post._id}`)}
                  >
                    Read More
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostsList;

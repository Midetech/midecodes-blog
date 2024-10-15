"use client";
import { Icons } from "@/components/icons";
import MarkdownRenderer from "@/components/MardownRenderer";
import BlogHeaderImage from "@/components/PostHeaderImage";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { IPost } from "@/interfaces/post.interface";
import { getMethod, postMethod } from "@/services/http-requests";
import { Calendar, MessageSquare, ThumbsUp, Timer } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const SinglePostWithComments = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const [post, setPost] = useState<IPost>({} as IPost);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(0);
  const [commentAdded, setCommentAdded] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useRouter();
  const handleLike = async () => {
    const res = await postMethod({
      route: `/posts/${params.id}/like`,
    });

    if (res) {
      setLikes(likes + 1);
    }
  };

  const handleCommentSubmit = async (e: any) => {
    e.preventDefault();
    const res = await postMethod({
      route: `/posts/${params.id}/comment`,
      payload: {
        user: "Sunday",
        comment: newComment,
      },
    });

    if (res) {
      setCommentAdded(!commentAdded);
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      const res = await getMethod({
        queryKey: [
          "posts",
          {
            route: `/posts/${params.id}`,
            params: {},
          },
        ],
      });
      setLoading(false);
      setPost(res);
    };
    getPosts();
  }, [commentAdded, likes]);
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {loading && (
        <div className="min-h-56 w-full flex items-center justify-center">
          <Icons.spinner className="w-20 h-20 animate-spin" />
        </div>
      )}
      <Button onClick={() => navigate.back()} className="my-4">
        Back
      </Button>
      {!loading && (
        <Card>
          <CardHeader>
            <BlogHeaderImage
              readTime={Math.ceil(post.content?.split(" ").length / 200)}
              imageUrl={post.image}
              title={post.title}
              author={post.author}
              date={new Date(post?.createdAt).toLocaleDateString()}
            />
          </CardHeader>
          <CardContent>
            <MarkdownRenderer content={post.content} />
            {/* <ReactMarkdown>{post.content}</ReactMarkdown> */}
            <div className="flex justify-between">
              <div className="flex flex-wrap gap-1 mt-4">
                {post?.tags?.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex justify-between w-full text-sm text-gray-500">
              <Button variant="ghost" size="sm" onClick={handleLike}>
                <ThumbsUp className="w-4 h-4 mr-1" />
                {post?.likes} likes
              </Button>
              <span className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-1" />
                {post?.comments?.length} comments
              </span>
            </div>
          </CardFooter>
        </Card>
      )}

      <Separator className="my-8" />

      <h2 className="text-xl font-bold mb-4">Comments</h2>

      <form onSubmit={handleCommentSubmit} className="mb-8">
        <Textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="mb-2"
        />
        <Button type="submit">Post Comment</Button>
      </form>

      <div className="space-y-4">
        {post?.comments?.map((comment) => (
          <Card key={comment?._id}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div className="font-semibold">{comment.user}</div>
                <div className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>{comment.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SinglePostWithComments;

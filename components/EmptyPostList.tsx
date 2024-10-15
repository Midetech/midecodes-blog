import { FileText, PlusCircle } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";

export const EmptyPostList = ({
  onCreatePost,
}: {
  onCreatePost: () => void;
}) => {
  return (
    <Card className="w-full max-w-md mx-auto text-center">
      <CardContent className="pt-6">
        <FileText className="w-12 h-12 mx-auto text-gray-400" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900">No posts</h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by creating a new post.
        </p>
      </CardContent>
      <CardFooter className="justify-center">
        <Button onClick={onCreatePost}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Post
        </Button>
      </CardFooter>
    </Card>
  );
};

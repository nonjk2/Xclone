import { SupabaseClient } from "@supabase/supabase-js";
import { createPost } from "../action/post-server";
import { Database } from "../../../database.types";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";

export type FormDataType = {
  content: string;
  isOriginal: boolean;
  images?: Blob | null;
  parentPostId?: string;
  client: SupabaseClient<Database>;
};

type useCreatePostProps = {
  formData: FormDataType;
  callbackFn: () => void;
  queryKeyType: string[];
};

const useCreatePost = ({
  callbackFn,
  formData,
  queryKeyType,
}: useCreatePostProps) => {
  const queryClient = useQueryClient();

  const mutationFn = async () => {
    const { content } = formData;
    try {
      // Generate image
      const response = await fetch("/api/generateImage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: content }),
      });

      const data = await response.json();
      const base64Image: string = data.image;
      return createPost({ ...formData, images: base64Image });
    } catch (e) {
      throw new Error("error ");
    }
  };

  const onSuccess = (data: unknown) => {
    callbackFn();
    queryClient.setQueryData(queryKeyType, (current: InfiniteData<Post[]>) => {
      const updatedFirstPage = [data, ...current.pages[0]];
      return {
        ...current,
        pages: [updatedFirstPage, ...current.pages.slice(1)],
      };
    });
  };
  return {
    mutationFn,
    onSuccess,
  };
};
export default useCreatePost;

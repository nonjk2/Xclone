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

  const downloadImage = async (url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return blob;
  };
  const generateImage = async (prompt: string) => {
    try {
      const response = await fetch("/api/generateImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      // return data.imageUrl;
      return downloadImage(data.imageUrl);
    } catch (error) {
      throw new Error("asdfsadf");
    }
  };

  const mutationFn = async () => {
    const { content } = formData;
    const imageBlob = await generateImage(content);
    return createPost({ ...formData, images: imageBlob });
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

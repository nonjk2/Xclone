import { SupabaseClient } from "@supabase/supabase-js";
import { createPost } from "../action/post-server";
import { Database } from "../../../database.types";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";

export type FormDataType = {
  content: string;
  isOriginal: boolean;
  images?: FileList | null;
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
  const mutationFn = () => {
    return createPost(formData);
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

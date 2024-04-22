import { v4 as uuidv4 } from "uuid";
import { supabaseClient } from "../util/supabase";
import { checkUserId } from "./server";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../../database.types";
import { QueryFunction } from "@tanstack/react-query";

interface FetchPostInterface {
  content: string;
  created_at: string;
  id: string;
  is_original: boolean;
  parent_post_id: string | null;
  user_id: string;
  User: authUser;
}

interface PostPathInterface {
  fullPath: string;
  id: string;
  path: string;
}

/**
 * postlist 가져오기 home
 *
 */

interface SinglePostPropsType {
  queryKey: [string, string];
  client: SupabaseClient;
}
interface getPostListType {
  pageParam: string | undefined;
  client: SupabaseClient<Database>;
}

// : QueryFunction<
//   Post[],
//   [_1: string, _2: string, string]
// >
type getUsersPostsProps = {
  queryKey: [_1: string, _2: string, string];
  client: SupabaseClient<Database>;
};

const getUsersPosts = async ({ queryKey, client }: getUsersPostsProps) => {
  const [_1, _2, username] = queryKey;
  const userId = await checkUserId(client);
  const { data: userpost, error } = await client
    .from("posts")
    .select(
      `
      * , 
      User:userinfo(*) , 
      Heart:post_likes(user_id) , 
      Images:post_images(id,link)
      `
    )
    .eq("nickname", username);

  if (error) {
    console.log(error);
    throw new Error("failed");
  }
  const post: Post[] = userpost.map((e) => {
    const heartLikedByUser =
      (e.Heart as Heart[]) && e.Heart.find((e: Heart) => e.user_id === userId);
    return {
      HeartLiked: !!heartLikedByUser?.user_id,
      id: e.id,
      User: e.User as authUser,
      content: e.content,
      createdAt: e.created_at,
      Images: e.Images,
      Heart: e.Heart,
      _count: { Hearts: e.Heart.length, Reposts: 0, Comments: 0 },
      OriginalPost: e.is_original,
      // Parent: e.parent_post_id ?? "",
      // ParentPost: !!e.parent_post_id,
    };
  });
  return post;
};

const getSinglePost = async ({
  queryKey,
  client,
}: SinglePostPropsType): Promise<Post> => {
  const [_, id] = queryKey;
  try {
    const userId = await checkUserId(client);

    const { data: newPost, error } = await client
      .from("posts")
      .select(
        `* ,
        User:userinfo!public_posts_user_id_fkey(*),
        Images:post_images(id,link),
        Heart:post_likes(user_id)
      `
      )
      .eq("id", id)
      .single();
    console.log(newPost);
    if (error) {
      throw new Error("singlepost error");
    }

    const heartLikedByUser = newPost.Heart.find(
      (e: Heart) => e.user_id === userId
    );
    const post: Post = {
      HeartLiked: !!heartLikedByUser,
      id: newPost.id,
      User: newPost.User as authUser,
      content: newPost.content,
      createdAt: newPost.created_at,
      Images: newPost.Images,
      Heart: newPost.Heart,
      _count: { Hearts: newPost.Heart.length, Reposts: 0, Comments: 0 },
      OriginalPost: newPost.is_original,
    };

    if (error) {
      throw new Error("singlePost error 2 ");
    }
    return post;
  } catch (error) {
    throw new Error("error");
  }
};

const updateHeartPost = async ({
  client,
  post_id,
  type,
}: {
  client: SupabaseClient;
  post_id: string;
  type: "unlike" | "like";
}) => {
  try {
    if (type === "like") {
      const { data, error } = await client
        .from("post_likes")
        .insert({ post_id })
        .select();
      if (error) {
        console.log(error);
        throw new Error(error.message);
      }
      return data;
    } else if (type === "unlike") {
      const { data, error } = await client
        .from("post_likes")
        .delete()
        .match({ post_id })
        .select();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    }
  } catch (error) {
    throw new Error("좋아요 실패");
  }
};

const getPostList = async ({
  pageParam = undefined,
  client,
}: getPostListType): Promise<Post[]> => {
  const userId = await checkUserId(client);
  try {
    let query = client
      .from("posts")
      .select(
        `* ,
        User:userinfo!public_posts_user_id_fkey(*),
        Images:post_images(id,link),
        Heart:post_likes(user_id)
      `
      )
      .order("created_at", { ascending: false })
      .limit(5);
    if (pageParam) {
      query = query.lt("created_at", pageParam);
    }

    const { data: newPost, error } = await query;
    // console.log("newPost : ", newPost);
    if (error) {
      console.log(error);
      throw new Error(error.message);
    }

    const post: Post[] = newPost.map((e) => {
      const heartLikedByUser =
        (e.Heart as Heart[]) &&
        e.Heart.find((e: Heart) => e.user_id === userId);
      return {
        HeartLiked: !!heartLikedByUser?.user_id,
        id: e.id,
        User: e.User as authUser,
        content: e.content,
        createdAt: e.created_at,
        Images: e.Images,
        Heart: e.Heart,
        _count: { Hearts: e.Heart.length, Reposts: 0, Comments: 0 },
        OriginalPost: e.is_original,
        // Parent: e.parent_post_id ?? "",
        // ParentPost: !!e.parent_post_id,
      };
    });

    return post;
  } catch (error) {
    throw new Error("getPostList fail");
  }
};

// 새로운 Post를 생성하는 비동기 함수
const createPost = async (formdata: {
  content: string;
  isOriginal: boolean;
  images?: FileList | null;
  parentPostId?: string;
  client: SupabaseClient;
}): Promise<Post> => {
  const { content, isOriginal, images, parentPostId, client } = formdata;
  try {
    const userId = await checkUserId(client);

    const { data, error } = await client
      .from("posts")
      .insert([
        {
          content,
          is_original: isOriginal,
          parent_post_id: parentPostId,
        },
      ])
      .select(
        `* ,
        User:userinfo!public_posts_user_id_fkey(*)
      `
      )
      .single();

    if (error) {
      console.error(error);
      throw new Error("Failed to create post");
    }
    let imageUrl = {} as PostImage;
    if (images && images.length > 0) {
      imageUrl = await insertImage(images[0], userId, data.id, client);
    }

    const newPost = { ...data } as unknown as FetchPostInterface;
    const post: Post = {
      id: newPost.id,
      User: newPost.User,
      content: newPost.content,
      createdAt: newPost.created_at,
      Images: imageUrl.id ? [imageUrl] : [],
      _count: { Hearts: 0, Reposts: 0, Comments: 0 },
      OriginalPost: newPost.is_original,
      Parent: newPost.parent_post_id ?? "",
      ParentPost: !!newPost.parent_post_id,
      Heart: [],
    };

    return post;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create post");
  }
};

const insertImage = async (
  file: File,
  userId: string,
  post_id: string,
  supabaseClient: SupabaseClient<Database>
): Promise<PostImage> => {
  try {
    // 스토리지 저장 !!
    const { data: uploadedFile, error: storageError } =
      await supabaseClient.storage
        .from("posts")
        .upload(`${userId}/${uuidv4()}`, file);

    if (storageError) {
      console.error(storageError);
      throw new Error("Failed to upload image");
    }
    const uploadData = uploadedFile as PostPathInterface;

    // 스토리지 url로 이미지 테이블에 저장!!
    const { data: insertedImage, error: insertError } = await supabaseClient
      .from("post_images")
      .insert([
        {
          post_id,
          link: uploadData.fullPath,
        },
      ])
      .select()
      .maybeSingle();

    if (insertError || !insertedImage) {
      throw new Error("Failed to link image to post");
    }

    return { id: insertedImage.id, link: insertedImage.link };
  } catch (error) {
    throw new Error("failed");
  }
};

export {
  createPost,
  getPostList,
  updateHeartPost,
  getSinglePost,
  getUsersPosts,
};

import { v4 as uuidv4 } from "uuid";
import { supabaseClient } from "./\bsupabase";

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

  supabaseAccessToken: string;
}
const getSinglePost = async ({
  queryKey,
  supabaseAccessToken,
}: SinglePostPropsType): Promise<Post> => {
  const [_, id] = queryKey;
  try {
    const supabase = supabaseClient(supabaseAccessToken);
    const { data: user, error: userinfoError } = await supabase
      .from("userinfo")
      .select("id")
      .single();

    if (!user) {
      throw new Error("user not found");
    }
    const { data: newPost, error } = await supabase
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
    const heartLikedByUser =
      (newPost.Heart as Heart) &&
      newPost.Heart.find((e: Heart) => e.user_id === user.id);
    const post: Post = {
      HeartLiked: !!heartLikedByUser,
      id: newPost.id,
      User: newPost.User,
      content: newPost.content,
      createdAt: newPost.created_at,
      Images: newPost.Images,
      Heart: newPost.Heart,
      _count: { Hearts: newPost.Heart.length, Reposts: 0, Comments: 0 },
      OriginalPost: newPost.is_original,
    };

    if (error) {
      throw new Error(error.message);
    }
    return post;
  } catch (error) {
    throw new Error("error");
  }
};

const updateHeartPost = async ({
  supabaseAccessToken,
  post_id,
  type,
}: {
  supabaseAccessToken: string;
  post_id: string;
  type: "unlike" | "like";
  heart_id?: number;
}) => {
  const supabase = supabaseClient(supabaseAccessToken);
  const { data: user, error: userinfoError } = await supabase
    .from("users")
    .select("id")
    .single();

  if (userinfoError) {
    throw new Error("user not found");
  }

  const user_id = user.id;
  try {
    if (type === "like") {
      const { data, error } = await supabase
        .from("post_likes")
        .insert({ user_id, post_id })
        .select();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    } else if (type === "unlike") {
      const { data, error } = await supabase
        .from("post_likes")
        .delete()
        .match({ user_id, post_id })
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

interface getPostListType {
  pageParam: string | undefined;
  supabaseAccessToken: string;
}

const getPostList = async ({
  pageParam = undefined,
  supabaseAccessToken,
}: getPostListType): Promise<Post[]> => {
  const supabase = supabaseClient(supabaseAccessToken);
  // const supabase = supabaseClientNotAuth();
  // console.log(supabaseAccessToken);
  try {
    const { data: user, error: userinfoError } = await supabase
      .from("users")
      .select("id")
      .single();
    // .single();
    console.log(user);
    if (userinfoError) {
      console.log(userinfoError);
    }
    if (!user) {
      throw new Error("User not found");
    }
    let query = supabase
      .from("posts")
      .select(
        `* ,
        User:userinfo(*),
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
    console.log("newPost : ", newPost);
    if (error) {
      throw new Error(error.message);
    }

    const post: Post[] = newPost.map((e) => {
      const heartLikedByUser =
        (e.Heart as Heart[]) &&
        e.Heart.find((e: Heart) => e.user_id === user.id);
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
  supabaseAccessToken: string;
  content: string;
  isOriginal: boolean;
  images?: FileList | null;
  parentPostId?: string;
}): Promise<Post> => {
  const { content, isOriginal, supabaseAccessToken, images, parentPostId } =
    formdata;
  try {
    const supabase = supabaseClient(supabaseAccessToken);
    // const supabase = supabaseClientNotAuth();
    console.log(supabaseAccessToken);
    const { data: user, error: userinfoError } = await supabase
      .from("users")
      .select("*")
      .single();

    console.log(user);
    if (userinfoError) {
      console.log(userinfoError);
    }
    if (!user) {
      throw new Error("user not found");
    }

    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          user_id: user.id,
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
      imageUrl = await insertImage(images[0], user.id, data.id);
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
  post_id: string
): Promise<PostImage> => {
  try {
    const supabase = supabaseClient();
    // 스토리지 저장 !!
    const { data: uploadedFile, error: storageError } = await supabase.storage
      .from("posts")
      .upload(`${userId}/${uuidv4()}`, file);

    if (storageError) {
      console.error(storageError);
      throw new Error("Failed to upload image");
    }
    const uploadData = uploadedFile as PostPathInterface;

    // 스토리지 url로 이미지 테이블에 저장!!
    const { data: insertedImage, error: insertError } = await supabase
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

export { createPost, getPostList, updateHeartPost, getSinglePost };

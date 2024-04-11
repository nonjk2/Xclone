import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { Database } from "../../../database.types";

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

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
const getPostList = async (): Promise<Post[]> => {
  try {
    const { data: newPost, error } = await supabase.from("posts").select(
      `* ,
        User:userinfo!public_posts_user_id_fkey(*),
        Images:post_images(id,link)
      `
    );
    if (error) {
      throw new Error(error.message);
    }
    console.log(newPost);
    const post: Post[] = newPost.map((e) => {
      return {
        id: e.id,
        User: e.User,
        content: e.content,
        createdAt: e.created_at,
        Images: e.Images,
        _count: { Hearts: 0, Reposts: 0, Comments: 0 },
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
const createPost = async (
  userId: string,
  content: string,
  isOriginal: boolean,
  images?: FileList | null,
  parentPostId?: string
): Promise<Post> => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          user_id: userId,
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
    if (images) {
      imageUrl = await insertImage(images[0], userId, data.id);
    }

    const newPost = { ...data } as unknown as FetchPostInterface;
    const post: Post = {
      id: newPost.id,
      User: newPost.User,
      content: newPost.content,
      createdAt: newPost.created_at,
      Images: [imageUrl],
      _count: { Hearts: 0, Reposts: 0, Comments: 0 },
      OriginalPost: newPost.is_original,
      Parent: newPost.parent_post_id ?? "",
      ParentPost: !!newPost.parent_post_id,
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

export { createPost, getPostList };

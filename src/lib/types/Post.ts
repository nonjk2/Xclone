type ActionCount = {
  Hearts: number;
  Reposts: number;
  Comments: number;
};
interface Post {
  User: authUser; //userId
  _count: ActionCount; //create
  id: string;
  content: string | null;
  createdAt: string | null;
  Images?: PostImage[]; //imageId
  OriginalPost: boolean | null; // 오리지날이야 ?
  Parent?: string; // 부모 포스트
  ParentPost?: boolean; // 부모 포스트가있어 ?
  Heart: Heart[];
  HeartLiked?: boolean;
}

interface Heart {
  user_id: string | null;
  id?: string;
  post_id?: string | null;
}
interface PostImage {
  link: string;
  id: string;
  Post?: Post;
}

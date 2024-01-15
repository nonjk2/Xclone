type ActionCount = {
  Hearts: number;
  Reposts: number;
  Comments: number;
};
interface Post {
  postId: number;
  User: User;
  content: string;
  createdAt: Date;
  Images: PostImage[];
  Hearts: UserID[];
  Reposts: UserID[];
  Comments: UserID[];
  _count: ActionCount;
  Original?: Post; // 재게시
  Parent?: Post; // 답글
}

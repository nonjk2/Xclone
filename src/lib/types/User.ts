interface UserID {
  id: string;
}

interface User {
  id: string;
  nickname: string;
  image: string | null;
  Followers: UserID[];
  _count: {
    Followers: number;
    Followings: number;
  };
}

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

interface authUser {
  id: string;
  nickname?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  phone?: string;
  address?: string;
  bio?: string;
  createdAt?: Date;
  user_id: string;
}
interface UserAddress {
  user_id: string;
  address: string;
  detail_address: string;
  city: string;
  state: string;
  postal_code: string;
}

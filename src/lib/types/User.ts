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
  email?: string | null;
  image?: string | null;
  phone?: string;
  address?: UserAddress;
  bio?: string;
  createdAt?: Date;
}
interface UserAddress {
  user_id: string;
  address: string;
  detail_address: string;
  city: string;
  state: string;
  postal_code: string;
}

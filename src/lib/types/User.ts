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
  address_id: string;
  bio: string | null;
  createdat: string;
  email: string | null;
  id: string;
  image: string | null;
  name: string;
  nickname: string;
  phone: string | null;
  user_id: string | null;
}
interface UserAddress {
  user_id: string;
  address: string;
  detail_address: string;
  city: string;
  state: string;
  postal_code: string;
}

interface user_metadata {
  avatar_url: string;
  email: string;
  email_verified: boolean;
  full_name: string;
  iss: string;
  name: string;
  phone_verified: boolean;
  picture: string;
  provider_id: string;
  sub: string;
}

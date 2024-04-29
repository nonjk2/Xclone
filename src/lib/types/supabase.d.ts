import { UserMetadata } from "@supabase/supabase-js";

declare module "@supabase/supabase-js" {
  interface UserMetadata {
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
    nickname: string;
  }
}

// interface User extends UserMetadata

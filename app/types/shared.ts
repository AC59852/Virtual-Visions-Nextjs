interface Post {
  id: string;
  title: string;
  description: string;
  created_at: Date;
  image: string;
  likes: number;
  game_id: string;
  users: {
    id: string;
    user_name: string;
    profile_pic: string;
  };
}

interface User {
  id: string;
  display_name: string;
  user_name: string;
  description: string;
  profile_pic: string;
  followers: {count: number}[];
}

interface LoggedInUser {
  id: string;
  role: string;
  aud: string;
  email: string;
  last_sign_in_at: string;
  app_metadata: {
    provider: string;
    providers: string[];
  };
}

interface PostComponentProps {
  post: Post;
  user: {
    id: string;
    user_name: string;
    profile_pic: string;
  };
}
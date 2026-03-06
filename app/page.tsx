import HomeHeader from "@/app/ui/home-header-component";
import PostComponent from "./ui/post-component";
import { createClient } from "@/app/lib/supabase/server"

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Step 1: get the list of user IDs the logged in user follows
  const { data: following } = await supabase
    .from('followers')
    .select('following_id')
    .eq('user_id', user?.id);

  const followingIds = following?.map(f => f.following_id) ?? [];

  // Step 2: fetch posts from those users
  const { data: posts, error } = await supabase
    .from('posts')
    .select(`
      *,
      users!posts_user_id_fkey (
        id,
        user_name,
        profile_pic
      )
    `)
    .in('user_id', followingIds)
    .order('created_at', { ascending: false })
    .limit(10);

    console.log('posts error:', error);
    console.log('posts:', posts);

  return (
    <main className="w-3xl">
      <HomeHeader name="Austin" profilePicture="/profile-pic.jpg" />
      <section className="w-full">
        {posts?.map((post: Post) => (
        <PostComponent key={post.id} post={post} />
      ))}
      </section>
    </main>
  );
}
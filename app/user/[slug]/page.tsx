import { createClient } from "@/app/lib/supabase/server"

export const revalidate = 60

const POSTS_PER_PAGE = 10;

export default async function User({ 
  params, 
  searchParams 
}: { 
  params: { slug: string }
  searchParams: { page?: string }
}) {
  const supabase = await createClient();
  const { slug } = await params;
  const { page } = await searchParams;

  const currentPage = Number(page ?? 1);
  const from = (currentPage - 1) * POSTS_PER_PAGE;
  const to = from + POSTS_PER_PAGE - 1;

  const { data, count } = await supabase
    .from('posts')
    .select(`
      id,
      image,
      title,
      created_at,
      users(
        id,
        display_name,
        user_name,
        description,
        profile_pic,
        followers!following_id (count)
      )
    `, { count: 'exact' })
    .eq('user_id', slug)
    .order('created_at', { ascending: false })
    .range(from, to)

  const user = data?.[0]?.users as User | undefined;
  const followerCount = user?.followers?.[0]?.count;
  const totalPages = Math.ceil((count ?? 0) / POSTS_PER_PAGE);

  return (
    <main className="w-[940px]">
      {user && (
        <div className="flex items-center gap-4 border-b-2 pb-9 px-12">
          {user.profile_pic && (
            <img 
              src={user.profile_pic} 
              alt={user.display_name} 
              className="w-38 h-38 rounded-full object-cover object-center"
            />
          )}
          <div>
            <h2 className="text-2xl font-bold">{user.display_name}</h2>
            <p className="text-gray-500">@{user.user_name}</p>
            {user.description && (
              <p className="text-center max-w-md">{user.description}</p>
            )}
            <p className="text-sm text-gray-500">{followerCount} followers</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-1 mt-8 w-full">
        {data?.map((post: any) => (
          <div key={post.id} className="w-full aspect-square relative">
            {post.image && (
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            )}
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex gap-4 mt-8 items-center">
          {currentPage > 1 && (
            <a 
              href={`?page=${currentPage - 1}`}
              className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Previous
            </a>
          )}
          <span className="text-sm text-gray-500">
            {currentPage} / {totalPages}
          </span>
          {currentPage < totalPages && (
            <a 
              href={`?page=${currentPage + 1}`}
              className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Next
            </a>
          )}
        </div>
      )}
    </main>
  )
}
import Image from "next/image";

export default function PostComponent({ post }: { post: Post }) {
  return (
    <div>
      <h3>{post.users.user_name}</h3>
      <Image src={post.image} alt={post.title} width={500} height={300} className="mt-2 w-full" />
      <div className="flex justify-between">
        <div className="flex gap-2">
          <p>{new Date(post.created_at).toLocaleDateString()}</p>
          <p>Likes: {post.likes}</p>
        </div>
        <p>Game ID: {post.game_id}</p>
      </div>
      <p>{post.description}</p>
    </div>
  )
}
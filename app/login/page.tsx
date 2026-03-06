import { login } from './actions'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  const { error } = await searchParams

  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-sm">
      <h1 className="text-3xl font-bold text-white mb-8">Sign In</h1>

      {error && (
        <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
      )}

      <form action={login} className="flex flex-col gap-4 w-full">
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:border-white/60"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:border-white/60"
        />
        <button
          type="submit"
          className="mt-2 px-4 py-3 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition-colors"
        >
          Log In
        </button>
      </form>
    </main>
  )
}

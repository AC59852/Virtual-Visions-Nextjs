export default function HomeHeader({ name, profilePicture } : {name: string, profilePicture: string}) {
  return (
    <section className="flex gap-[35px] items-end border-b-2 w-full pb-8 mb-20">
      <img src={profilePicture} alt={`${name}'s profile`} className="w-22 h-22 rounded-full bg-blue-200"/>
      <div className="mb-1 flex items-end gap-3">
        <h2 className="text-6xl text-white font-bold">Hello, {name}</h2>
        <span className="bg-white text-black text-3xl w-6 h-6 flex items-center justify-center rounded-xs mb-3">+</span>
      </div>
    </section>
  )
}
import Image from "next/image";

export default function Home() {
  return (
    <div className='w-full bg-black text-white'>
      <main className='flex justify-center items-center m-auto h-screen flex-col'>
        <div className='text-8xl '>
          Welcome to <a href='https://nextjs.org'>Next.js 13!</a>
        </div>
        <div className='text-4xl my-10 '>
          This is a Tailwind Example with Next.js 13
        </div>
      </main>
    </div>
  );
}

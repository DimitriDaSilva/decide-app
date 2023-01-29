import Image from "next/image";
import styles from "./page.module.css";

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

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

'use client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  router.push('/login');

  return (
    <div className="bg-gray-100 w-screen h-screen flex items-center">
      <div className="text-center w-full"></div>
    </div>
  );
}

'use client';

import { useSession, signIn } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';

export default function Home() {
  const { data: session } = useSession({
    // required: false,
    // onUnauthenticated() {
    //   redirect('/');
    // },
  });

  if (!session) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button
            onClick={() => signIn('google')}
            className="bg-white py-2 px-4 rounded-lg"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  return <div>Logged in.</div>;
}

'use client';

import { useSession, signIn } from 'next-auth/react';
import Nav from '../components/Nav';
// import { redirect } from 'next/dist/server/api-utils';

export default function Layout({ children }) {
  const { data: session } = useSession({});

  if (!session) {
    return (
      <div className="bg-gray-100 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button
            onClick={() => signIn('google')}
            className="bg-yellow-200 py-2 px-4 rounded-lg"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-yellow-200 min-h-screen flex">
      <Nav />
      <div className="bg-gray-100 flex-grow mr-2 my-2 rounded-lg p-4">
        {children}
      </div>
    </div>
  );
}

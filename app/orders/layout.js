'use client';

import { useSession, signIn } from 'next-auth/react';
import Nav from '../components/Nav';
import { useState } from 'react';
import Logo from '../components/Logo';

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);
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
    <div className="bg-gray-200 min-h-screen ">
      <div className="md:hidden flex justify-between px-4">
        <button
          onClick={() => {
            setShowNav(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <Logo />
      </div>

      <div className="flex">
        <Nav show={showNav} setShowNav={setShowNav} />
        <div className="bg-gray-100 shadow-md flex-grow mx-2 my-2 p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
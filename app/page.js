'use client';

import { useSession, signIn } from 'next-auth/react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';

export default function Home() {
  const { data: session, status } = useSession({});

  if (status === 'loading') {
    return (
      <div className="bg-gray-200 min-h-screen flex justify-center items-center"></div>
    );
  }

  if (!session)
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

  return (
    <Layout>
      <div className="flex justify-between">
        <h2>
          Welcome, <b>{session?.user?.name}</b>
        </h2>
        <span>{session?.user?.email}</span>
      </div>
      <Dashboard />
    </Layout>
  );
}

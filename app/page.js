'use client';

import { useSession } from 'next-auth/react';
import Layout from './components/Layout';

export default function Home() {
  const { data: session } = useSession();

  if (!session) return;

  return (
    <Layout>
      <div className="flex justify-between">
        <h2>
          Welcome, <b>{session?.user?.name}</b>
        </h2>
        <span>{session?.user?.email}</span>
      </div>
    </Layout>
  );
}

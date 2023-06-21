import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function PrivateLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) redirect('/login');

  return <>{children}</>;
}

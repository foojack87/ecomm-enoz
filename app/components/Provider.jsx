'use client';

// Wrapper for auth sessions

import { SessionProvider } from 'next-auth/react';

const Provider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;

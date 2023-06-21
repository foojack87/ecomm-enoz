'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from '../components/Logo';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Alert from '../components/Alert';

const SignIn = () => {
  const router = useRouter();

  router.push('/');
  return (
    <>
      <div></div>
    </>
  );
};

export default SignIn;

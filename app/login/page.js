'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from '../components/Logo';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Alert from '../components/Alert';

const SignIn = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  console.log('Initial UserInfo:', userInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { email, password } = userInfo;
    console.log('Email:', email);
    console.log('Password:', password);

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res?.error) return setError(res.error);
    router.replace('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Logo />

      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        {error ? (
          <div className="mb-4">
            <Alert value={error} />
          </div>
        ) : null}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-4 items-center justify-between ">
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            type="submit"
            disabled={isLoading}
          >
            Sign In
          </button>
          <div className="text-sm text-gray-600 mb-4">
            Don't have an account?{' '}
            <Link href="/">
              <span className="text-blue-500 hover:underline">
                Sign up here
              </span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;

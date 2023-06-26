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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true); // Track email validity

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });

    if (name === 'email') {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsEmailValid(emailRegex.test(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { email, password } = userInfo;

    // Perform validation before submission
    if (!isEmailValid) {
      setError('Invalid email format');
      setIsLoading(false);
      return;
    }

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError(res.error);
      setIsLoading(false);
    } else {
      router.replace('/dashboard');
    }
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
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              !isEmailValid ? 'border-red-500' : ''
            }`}
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
        <div className="flex flex-col gap-4 items-center justify-between">
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isLoading || !isEmailValid ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            type="submit"
            disabled={isLoading || !isEmailValid}
          >
            Sign In
          </button>
          {/* <div className="text-sm text-gray-600 mb-4">
            Don't have an account?{' '}
            <Link href="/">
              <span className="text-blue-500 hover:underline">
                Sign up here
              </span>
            </Link>
          </div> */}
        </div>
      </form>
    </div>
  );
};

export default SignIn;

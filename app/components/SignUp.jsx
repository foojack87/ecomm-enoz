import axios from 'axios';
import { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { useRouter } from 'next/navigation';
import Alert from './Alert';

const SignUp = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post('/api/auth/admins', userInfo);
      // Request successful, handle the response or perform any necessary actions
      console.log(res);
    } catch (error) {
      // An error occurred, handle the error
      if (res?.error) return setError(res.error);
      router.push('/');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
      router.push('/login'); // Set isLoading back to false after the signup process completes
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
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
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Enter your name"
            name="name"
            value={userInfo.name}
            onChange={handleChange}
            required
          />
        </div>
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
            Sign Up
          </button>
          <div className="text-sm text-gray-600 mb-4">
            Already have an account?{' '}
            <Link href="/login">
              <span className="text-blue-500 hover:underline">Login here</span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

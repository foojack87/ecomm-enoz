'use client';

import SignUp from './components/SignUp';

export default function Home() {
  return (
    <div className="bg-gray-100 w-screen h-screen flex items-center">
      <div className="text-center w-full">
        <SignUp />
      </div>
    </div>
  );
}

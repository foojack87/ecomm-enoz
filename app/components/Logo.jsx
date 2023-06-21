import Link from 'next/link';

const Logo = () => {
  return (
    <Link href={'/'} className="flex gap-1">
      <img src="/enoz logo.png" alt="brand logo" loading="lazy" />
    </Link>
  );
};

export default Logo;

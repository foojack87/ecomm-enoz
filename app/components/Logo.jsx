import Link from 'next/link';
import Image from 'next/image';

const Logo = () => {
  return (
    <Link href={'/'} className="flex gap-1">
      <Image src="/enoz logo.png" width={250} height={250} alt="brand logo" />
    </Link>
  );
};

export default Logo;

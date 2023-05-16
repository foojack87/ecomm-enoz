import Link from 'next/link';

export default function Products() {
  return (
    <div>
      <Link className="btn-primary" href={'/products/new'}>
        Add new product
      </Link>
    </div>
  );
}

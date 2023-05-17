'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/newproduct');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const newProducts = await response.json();
        setProducts(newProducts);
        console.log(newProducts);
      } catch (error) {
        console.error('Error retrieving products:', error);
      }
    };

    fetchData();
  }, []);

  const getProducts = () => {
    console.log(products);
  };

  return (
    <div>
      <Link
        className="btn-primary"
        href={'/products/new'}
        onClick={getProducts}
      >
        Add new product
      </Link>
      <table>
        <thead>
          <tr>
            <td>Item Name</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>buttons</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

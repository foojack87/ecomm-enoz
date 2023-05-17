'use client';

import axios from 'axios';
import { redirect } from 'next/navigation';
import { useState } from 'react';
export default function NewProduct() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [goToProducts, setGoToProducts] = useState(false);

  const createProduct = async (e) => {
    e.preventDefault();
    const data = { title, description, price };
    await axios.post('/api/newproduct', data);
    setGoToProducts(true);
  };

  if (goToProducts) {
    redirect('/products');
  }

  return (
    <>
      <form onSubmit={createProduct}>
        <h1>New Product</h1>
        <label>Item Name</label>
        <input
          type="text"
          placeholder="product name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label>Item Description</label>
        <textarea
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <label>Unit Price (USD)</label>
        <input
          type="number"
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>
    </>
  );
}

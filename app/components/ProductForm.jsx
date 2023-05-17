import { useState } from 'react';
import axios from 'axios';
import { redirect } from 'next/navigation';

const ProductForm = ({
  _id,
  title: currTitle,
  description: currDescription,
  price: currPrice,
}) => {
  const [title, setTitle] = useState(currTitle || '');
  const [description, setDescription] = useState(currDescription || '');
  const [price, setPrice] = useState(currPrice || '');
  const [goToProducts, setGoToProducts] = useState(false);

  const saveProduct = async (e) => {
    e.preventDefault();
    const data = { title, description, price };
    if (_id) {
      //update
      await axios.put('/api/newproduct', { ...data, _id });
    } else {
      await axios.post('/api/newproduct', data);
    }
    setGoToProducts(true);
  };

  if (goToProducts) {
    redirect('/products');
  }

  return (
    <>
      <form onSubmit={saveProduct}>
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
};

export default ProductForm;

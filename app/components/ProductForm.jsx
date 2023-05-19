import { useState } from 'react';
import axios from 'axios';
import { redirect } from 'next/navigation';

const ProductForm = ({
  _id,
  title: currTitle,
  description: currDescription,
  price: currPrice,
  images: existingImages,
}) => {
  const [title, setTitle] = useState(currTitle || '');
  const [description, setDescription] = useState(currDescription || '');
  const [price, setPrice] = useState(currPrice || '');
  const [images, setImages] = useState(existingImages || []);
  const [goToProducts, setGoToProducts] = useState(false);

  const saveProduct = async (e) => {
    e.preventDefault();
    const data = { title, description, price, images };
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

  const uploadImages = async (e) => {
    const files = e.target?.files;
    if (files?.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append('file', file);
      }
      try {
        const res = await axios.post('/api/upload', data);
        console.log(res.data);
        setImages((oldImages) => {
          return [...oldImages, ...res.data.links];
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

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
        <label>Photos</label>
        <div className="flex mb-2 gap-2 items-center">
          {!!images?.length &&
            images.map((link) => (
              <div key={link} className="inline-block h-24">
                <img src={link} alt="product images" className="rounded-lg" />
              </div>
            ))}
          <label className="w-24 h-24 border flex flex-col items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-300 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <span>Upload</span>
            <input type="file" onChange={uploadImages} className="hidden" />
          </label>
        </div>
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

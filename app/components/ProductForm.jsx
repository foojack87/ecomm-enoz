import { useState, useEffect } from 'react';
import axios from 'axios';
import { ReactSortable } from 'react-sortablejs';
import { redirect } from 'next/navigation';
import Spinner from './Spinner';

const ProductForm = ({
  _id,
  title: currTitle,
  description: currDescription,
  price: currPrice,
  images: existingImages,
  category: assignedCategory,
  productProperties: assignedProperties,
}) => {
  const [title, setTitle] = useState(currTitle || '');
  const [description, setDescription] = useState(currDescription || '');
  const [category, setCategory] = useState(assignedCategory || '');
  const [price, setPrice] = useState(currPrice || '');
  const [images, setImages] = useState(existingImages || []);
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productProperties, setProductProperties] = useState(
    assignedProperties || {}
  );

  console.log('Initial productProperties:', productProperties);

  useEffect(() => {
    axios.get('/api/categories').then((res) => {
      setCategories(res.data);
    });
  }, []);

  // Add the following useEffect hook after the setCategory state declaration
  useEffect(() => {
    if (category && categories.length > 0) {
      const categoryInfo = categories.find(({ _id }) => _id === category);
      if (categoryInfo && categoryInfo.properties.length > 0) {
        const initialProperties = categoryInfo.properties.reduce(
          (acc, prop) => {
            acc[prop.name] = prop.values[0];
            return acc;
          },
          {}
        );
        setProductProperties(initialProperties);
      } else {
        setProductProperties({});
      }
    }
  }, [category, categories]);

  const saveProduct = async (e) => {
    e.preventDefault();
    const data = {
      title,
      description,
      price,
      images,
      category: category ? category : null, // Set category to null if it is an empty string
      productProperties,
    };
    if (category === '') {
      data.category = null; // Set category to null if it is an empty string
    }
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
      setIsUploading(true);
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
        setIsUploading(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const removeImage = (index) => {
    setImages((oldImages) => {
      const updatedImages = [...oldImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const updateImagesOrder = (images) => {
    setImages(images);
  };

  const changeProductProperties = (propName, value) => {
    setProductProperties((prev) => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      return newProductProps;
    });
  };

  const propertiesToFill = [];
  if (categories?.length > 0 && category) {
    let categoryInfo = categories.find(({ _id }) => _id === category);
    propertiesToFill.push(...categoryInfo.properties);
    while (categoryInfo?.parentCategory?.id) {
      const parent = categories.find(
        ({ _id }) => _id === categoryInfo.parentCategory?.id
      );
      propertiesToFill.push(...parent, parent.properties);
      categoryInfo = parent;
    }
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
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Uncategorized</option>
          {categories?.length > 0 &&
            categories.map((cats, index) => (
              <option value={cats._id} key={index}>
                {cats.categoryName}
              </option>
            ))}
        </select>
        {propertiesToFill?.length > 0 &&
          propertiesToFill.map((p, index) => (
            <div className="" key={index}>
              <label>{p.name[0].toUpperCase() + p.name.substring(1)}</label>
              <div>
                <select
                  value={productProperties[p.name]}
                  onChange={(e) =>
                    changeProductProperties(p.name, e.target.value)
                  }
                >
                  {p.values.map((v, index) => (
                    <option value={v} key={index}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        <label>Photos</label>
        <div className="flex mb-2 gap-2 items-center">
          <ReactSortable
            className="flex flex-wrap gap-1"
            list={images}
            setList={updateImagesOrder}
          >
            {!!images?.length &&
              images.map((link, index) => (
                <div
                  key={link}
                  className="bg-white p-4 h-24 shadow-sm rounded-sm border border-gray-200 flex items-center justify-center relative"
                >
                  <img src={link} alt="product images" className="rounded-lg" />
                  <button
                    className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                    onClick={() => removeImage(index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
          </ReactSortable>
          {isUploading && (
            <div className="h-24 flex items-center justify-center p-1">
              <Spinner />
            </div>
          )}
          <label className="w-24 h-24 border border-gray-200 flex flex-col items-center justify-center text-sm gap-1 text-gray-500 rounded-sm bg-white shadow-sm cursor-pointer">
            {isUploading ? (
              <div className="animate-spin">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  {/* Upload animation */}
                </svg>
              </div>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                {/* Upload icon */}
              </svg>
            )}
            <span>Add Img</span>
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

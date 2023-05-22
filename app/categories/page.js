'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Categories = () => {
  const [editting, setIsEditting] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await axios.get('/api/categories/');
    setCategories(res.data);
  };

  const saveCategory = async (e) => {
    e.preventDefault();
    const data = { categoryName };

    if (parentCategory) {
      data.parentCategory = parentCategory;
    }

    if (editting) {
      data._id = editting._id;
      await axios.put('/api/categories', data);
      setIsEditting(null);
    } else {
      await axios.post('/api/categories', data);
    }
    setCategoryName('');
    fetchCategories();
  };

  const editCategory = (cats) => {
    setIsEditting(cats);
    setCategoryName(cats.categoryName);
    setParentCategory(cats.parentCategory ? cats.parentCategory._id : '');
  };

  const deleteCategory = (category) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete ${category.categoryName}?`,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Confirm',
      confirmButtonColor: '#d55',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { _id } = category;
        console.log('Deleting category with id:', _id);
        await axios.delete(`/api/categories/${_id}`);
        fetchCategories();
      }
    });
  };

  return (
    <>
      <h1>Categories</h1>
      <label>
        {editting
          ? `Edit Category: ${editting.categoryName}`
          : 'Create Category'}
      </label>
      <form onSubmit={saveCategory} className="flex gap-1">
        <input
          type="text"
          className="mb-0"
          placeholder={'Category name'}
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <select
          className="mb-0"
          value={parentCategory}
          onChange={(e) => setParentCategory(e.target.value)}
        >
          <option value="">No Parent Category</option>
          {categories.length > 0 &&
            categories.map((cats) => (
              <option value={cats._id} key={cats._id}>
                {cats.categoryName}
              </option>
            ))}
        </select>
        <button type={'submit'} className="btn-primary">
          Save
        </button>
      </form>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Category name</td>
            <td>Parent category</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {categories?.length > 0 &&
            categories.map((cats) => (
              <tr key={cats._id}>
                <td>{cats.categoryName}</td>
                <td>{cats?.parentCategory?.categoryName}</td>
                <td className="text-center">
                  <button
                    onClick={() => editCategory(cats)}
                    className="btn-primary mr-1"
                  >
                    Edit
                  </button>
                  <button
                    className="btn-primary"
                    onClick={() => deleteCategory(cats)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Categories;

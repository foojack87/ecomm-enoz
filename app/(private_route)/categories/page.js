'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import Swal from 'sweetalert2';

const Categories = () => {
  const [editting, setIsEditting] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState('');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/categories/');
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const saveCategory = async (e) => {
    e.preventDefault();
    const data = {
      categoryName,
      properties: properties.map((p) => ({
        name: p.name,
        values: p.values.split(','),
      })),
    };

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
    setParentCategory('');
    setProperties([]);
    fetchCategories();
  };

  const editCategory = (cats) => {
    setIsEditting(cats);
    setCategoryName(cats.categoryName);
    setParentCategory(cats.parentCategory ? cats.parentCategory._id : '');
    setProperties(
      cats.properties.map((property) => ({
        name: property.name,
        values: Array.isArray(property.values) ? property.values.join(',') : '',
      }))
    );
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

  const addProperty = (e) => {
    e.preventDefault();
    setProperties((prev) => {
      return [...prev, { name: '', values: '' }];
    });
  };

  const handlePropertyNameChange = (index, property, newName) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  };

  const handlePropertyValueChange = (index, property, newValues) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  };

  const removeProperty = (indexToRemove) => {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
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
      <form onSubmit={saveCategory}>
        <div className="flex gap-1">
          <input
            type="text"
            placeholder={'Category name'}
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <select
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
        </div>
        <div className="mb-2">
          <label className="block">Properties</label>
          <button
            onClick={addProperty}
            type="button"
            className="btn-default text-sm"
          >
            Add property
          </button>
          {properties?.length > 0 &&
            properties.map((property, index) => (
              <div key={index} className="flex items-center gap-1 mt-2">
                <input
                  type="text"
                  value={property.name}
                  className="mb-0"
                  onChange={(e) =>
                    handlePropertyNameChange(index, property, e.target.value)
                  }
                  placeholder="name (example: flavor)"
                />
                <input
                  type="text"
                  value={property.values}
                  className="mb-0"
                  onChange={(e) =>
                    handlePropertyValueChange(index, property, e.target.value)
                  }
                  placeholder="values, comma separated"
                />
                <button
                  className="btn-red"
                  type="button"
                  onClick={() => removeProperty(index)}
                >
                  Remove
                </button>
              </div>
            ))}
        </div>
        {editting && (
          <button
            type="button"
            className="btn-default mr-2"
            onClick={() => {
              setIsEditting(null);
              setCategoryName('');
              setParentCategory('');
              setProperties([]);
            }}
          >
            Cancel
          </button>
        )}
        <button type={'submit'} className="btn-default">
          Save
        </button>
      </form>
      {!editting && (
        <table className="basic mt-4">
          <thead>
            <tr>
              <td>Category name</td>
              <td>Parent category</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3">
                  <Loading />
                </td>
              </tr>
            ) : (
              categories?.length > 0 &&
              categories.map((cats) => (
                <tr key={cats._id}>
                  <td>{cats.categoryName}</td>
                  <td>{cats?.parentCategory?.categoryName}</td>
                  <td className="text-center items-center flex flex-col gap-1 sm:gap-0 sm:block">
                    <button
                      onClick={() => editCategory(cats)}
                      className="btn-default sm:mr-2"
                    >
                      Edit
                    </button>
                    <button
                      className="btn-red"
                      onClick={() => deleteCategory(cats)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Categories;

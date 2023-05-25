'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import ProductForm from '@/app/components/ProductForm';

export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/api/newproduct/' + id).then((res) => {
      console.log(res.data);
      setProductInfo(res.data);
    });
  }, [id]);

  console.log(id);
  return <>{productInfo && <ProductForm {...productInfo} />}</>;
}

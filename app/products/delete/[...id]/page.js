'use client';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DeleteProductPage() {
  const [productInfo, setProductInfo] = useState();
  const router = useRouter();
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

  const goBack = () => {
    router.push('/products');
  };

  const deleteProduct = async () => {
    await axios.delete('/api/newproduct/' + id);
    router.push('/products');
  };

  return (
    <>
      <h1 className="text-center">
        Do you really want to delete "{productInfo?.title}"?
      </h1>
      <div className="flex gap-2 justify-center">
        <button className="btn-red" onClick={deleteProduct}>
          YES
        </button>
        <button className="btn-default" onClick={goBack}>
          NO
        </button>
      </div>
    </>
  );
}

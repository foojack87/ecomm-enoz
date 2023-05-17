'use client';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

export default function EditProductPage() {
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/api/newproduct/' + id).then((res) => {
      console.log(res.data);
    });
  }, [id]);

  console.log(id);
  return <>Edit product form here</>;
}

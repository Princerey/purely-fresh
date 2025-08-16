"use client"
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import products from '../lib/data/products';

export default function CardDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      const foundProduct = products.find((prod) => prod.title === id);
      setProduct(foundProduct);
    }
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <img src={product.image} alt={product.title} className="w-full h-64 object-cover mb-4" />
      <p className="text-lg mb-4">{product.description}</p>
      <p className="text-2xl font-bold text-green-500">${product.price}</p>
    </div>
  );
}

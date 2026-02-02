"use client";

import ProductList from "../components/Product/ProductList";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { CartItem } from "../features/cart/cartSlice";


export default function Products() {
  const [products, setProducts] = useState<Omit<CartItem, 'quantity'>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_API_URL);

    const fetchProduct = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("unkown error");
        }
      } finally {
        setLoading(false);
      }

    };

    fetchProduct();
  }, []);



  return (
    <div className={styles.container}>
      {
        loading && <p>Loading...</p>
      }
      {
        error && <p>{error}</p>
      }
      <ProductList products={products}/>
    </div>
  );
}

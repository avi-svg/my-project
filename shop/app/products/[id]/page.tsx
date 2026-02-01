"use client";

import { notFound, useParams } from "next/navigation";
import styles from './page.module.css'
import { usePathname } from "next/navigation";
import { Params } from "@/types/ProductsTypes";
import { useState, useEffect } from "react";
import ProductDetail from "./ProductDetailes";
import { CartItem } from "@/app/features/cart/cartSlice";



export default function ProductDetails() {
  
  const [product, setProduct] = useState<Omit<CartItem, 'quantity'>>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams<Params>();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
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

    <main className={styles.container}>
      
      {
        loading && <p>Loading...</p>
      }
      {
        error && <p>{error}</p>
      }


      {!!product && (
        <ProductDetail
        product={product} 
        />
      )}
    </main>
  );
}

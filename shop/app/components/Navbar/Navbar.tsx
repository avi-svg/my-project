"use client";

import { useAtom } from "jotai";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectorCartTotalQuantity } from "@/app/features/cart/cartSelector";


export default function Navbar() {
  const router = useRouter();
  const handleCartClick = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login?redirect=/card");
    } else {
      router.push("/card");
    }
  };
  const totalQuantity = useSelector(selectorCartTotalQuantity);

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <nav className={styles.link}>
        <div className={styles.cartContainer}>
            <button onClick={handleCartClick}>My Cart</button>
            {totalQuantity > 0 && <span className={styles.cartBadge}>{totalQuantity}</span>}
          </div>
        </nav>
      </div>
      <div className={styles.right}>
        <Link href={"/products"} className={styles.link}>
          Products
        </Link>
        <Link href={"/reviews"} className={styles.link}>
          Reviews
        </Link>
      </div>
    </nav>
  );
}

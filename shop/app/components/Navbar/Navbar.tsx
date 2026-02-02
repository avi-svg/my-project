"use client";

import { useAtom } from "jotai";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { selectorCartTotalQuantity } from "@/app/features/cart/cartSelector";
import { RootState } from "../../store/store";
import { logout } from "@/app/login/services/api";
import { setUnauthenticated } from "@/app/features/auth/authSlice";

export default function Navbar() {
  const router = useRouter();
  const totalQuantity = useSelector(selectorCartTotalQuantity);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const handleLogout = async () => {
    await logout();
    dispatch(setUnauthenticated());
    

    router.push("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <nav className={styles.link}>
          <div className={styles.cartContainer}>
            <Link href="/card">My Cart</Link>
            {totalQuantity > 0 && (
              <span className={styles.cartBadge}>{totalQuantity}</span>
            )}
          </div>
        </nav>
        <nav>
          {isAuthenticated ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <div>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </div>
          )}
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

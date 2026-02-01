"use client";

import { useDispatch, useSelector } from "react-redux";
import styles from "./page.module.css";
import { selectorCartItems, selectorCartTotalPrice, selectorCartTotalQuantity } from "../features/cart/cartSelector";
import { decrement, increment, removeItem } from "../features/cart/cartSlice";



const Card = () => {

  const dispatch = useDispatch();
  const cartItems = useSelector(selectorCartItems);
  const totalQuantity = useSelector(selectorCartTotalQuantity);
  const totalPrice = useSelector(selectorCartTotalPrice);
  const handelPayNow = async () => {
    try {
      console.log("CLIENT SEND");

      if (totalQuantity == 0) {
        alert("No orders!");
        return;
      }
      const response = await fetch("http://localhost:3001/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          totalAmount: totalPrice,
          totalQuantity: totalQuantity,
          cartItems: cartItems.map(
            ({ id: product_id, quantity: quantity, price: price }) => ({
              product_id,
              quantity,
              price,
            }),
          ),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch order");
      }

      const data = await response.json();

      console.log(data);
      alert("sucses");
    } catch (e) {
      console.log(e, "error");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.mainHeader}>Cart</h1>
      <ul>
        {useSelector(selectorCartItems).map((item) => (
          <li key={item.id} className={styles.cartItem}>
            <button onClick={() => dispatch(increment(item.id))}>+</button>
            <span className={styles.itemName}>{item.name}</span>
            <span className="">Quantity: {item.quantity}</span>
            <span className={styles.itemPrice}>₪{item.price.toFixed(2)}</span>
            <button onClick={() => dispatch(decrement(item.id))}>-</button>
            <button onClick={() => dispatch(removeItem(item.id))}>❌</button>
          </li>
        ))}
      </ul>

      <div className={styles.total}>
        <span>Total:</span>
        <span className={styles.totalPrice}>₪{totalPrice.toFixed(2)}</span>
      </div>

      <div className={styles.actions}>
        <button className={styles.payButton} onClick={handelPayNow}>
          Pay Now
        </button>
        {/* <button className={styles.emptyButton}>
          Empty the Cart
        </button> */}
      </div>
    </div>
  );
};

export default Card;

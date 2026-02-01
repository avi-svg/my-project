import Link from "next/link";
import styles from "./Product.module.css";
import { useDispatch } from "react-redux";
import { addItem, CartItem } from "@/app/features/cart/cartSlice";


type Props = {
  product: Omit<CartItem, "quantity">;
};



const ProductCard = ({product}: Props) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.card}>
      <Link href={`/products/${product.id}`}>
        <img className={styles.image} src={product.image} alt={product.name} />
        <h2 className={styles.name}>{product.name}</h2>
        <p className={styles.price}>₪{product.price.toFixed(2)}</p>
      </Link>
      <button className={styles.button} onClick={() => dispatch(addItem(product))}>ADD</button>
    </div>
  );
};

export default ProductCard;

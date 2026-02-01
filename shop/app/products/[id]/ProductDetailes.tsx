import { useDispatch } from 'react-redux';
import styles from './ProductDetailes.module.css';
import { addItem, CartItem } from '@/app/features/cart/cartSlice';

type Props = {
  product: Omit<CartItem, "quantity">;
};

const ProductDetail = ({product}: Props) => {

  const dispatch = useDispatch();

  return (
    <article className={styles.product}>
      <h1 className={styles.title}>{product.name}</h1>

      <section className={styles.content}>
        <div className={styles.descriptionSection}>
          <p className={styles.description}>{product.description}</p>
        </div>

        <div className={styles.imageSection}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.image}
          />
        </div>
      </section>

      <hr className={styles.divider} />

      <section className={styles.bottomSection}>
        <p className={styles.price}>
          Price: ${product.price.toFixed(2)}
        </p>

        <button className={styles.button} onClick={() => dispatch(addItem(product))}>
          Add to Cart
        </button>
      </section>
    </article>
  );
};

export default ProductDetail;

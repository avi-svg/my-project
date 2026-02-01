
import { CartItem } from "@/app/features/cart/cartSlice";
import ProductCard from "./ProductCard";




type Props = {
  products: Omit<CartItem, "quantity">[];
};



const ProductList = ({products}: Props) => {
  return (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center"}}>
      {products.map((product) => {
        return (
          <ProductCard
            key={product.id}
            product={product}
          />
        );
      })}
    </div>
  );
};

export default ProductList;

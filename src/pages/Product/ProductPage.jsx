import { useParams } from "react-router-dom";
import { Product } from "../../components/Product/Product";

export const ProductPage = (setParentCounter) => {
  const id = useParams();

  return <Product id={id.productId} setParentCounter={setParentCounter} />;
};

// export const ProductPage = () => {
//   const id = useParams();

//   return <Product id={id.productId} />;
// };
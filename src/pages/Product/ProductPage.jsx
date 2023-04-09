import { useParams } from "react-router-dom";
import { Product } from "../../components/Product/Product";

export const ProductPage = (setParentCounter) => {
  const id = useParams();
  return <Product id={id.productId} setParentCounter={setParentCounter} />;
};

// useEffect(() => {
//   api.getProductById(id).then((data) => setProduct(data));
// }, [id]);

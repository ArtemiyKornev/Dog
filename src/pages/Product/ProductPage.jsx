import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../components/Product/Product";
import { CardContext } from "../../context/cardContext";
import { UserContext } from "../../context/userContext";
import { api } from "../../utils/api";

export const ProductPage = () => {
  const id = useParams();
  const [product, setProduct] = useState(null);
  const { currentUser } = useContext(UserContext);
  const { handleProductLike } = useContext(CardContext);
  const onProductLike = () => {
    const wasLiked = handleProductLike(product);
    if (wasLiked) {
      const filteredLikes = product.likes.filter((e) => e !== currentUser._id);
      setProduct({ ...product, likes: filteredLikes });
    } else {
      const addedLikes = [...product.likes, currentUser._id];
      setProduct({ ...product, likes: addedLikes });
    }
  };

  const onSendReview = (newProduct) => {
    setProduct({ ...newProduct });
  };

  useEffect(() => {
    if (!id?.productId) {
      return;
    }
    api.getProductById(id?.productId).then((data) => setProduct(data));
  }, [id?.productId]);
  return product && currentUser ? (
    <Product
      product={product}
      onSendReview={onSendReview}
      id={id.productId}
      onProductLike={onProductLike}
      currentUser={currentUser}
    />
  ) : (
    <div>Пожалуйста подождите</div>
  );
};

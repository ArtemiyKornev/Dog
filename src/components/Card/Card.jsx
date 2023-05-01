import { ReactComponent as Like } from "./like.svg";
import "./index.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import React, { useRef } from "react";
import { CardContext } from "../../context/cardContext";
import { findLike } from "../../utils/utils";

export const Card = ({
  product,
  pictures,
  name,
  price,
  wight,
  discount,
  setParentCounter,
  onProductLike,
}) => {
  const { currentUser } = React.useContext(UserContext);
  const { onProductDelete } = React.useContext(CardContext);

  const isLiked = findLike(product, currentUser);
  const handleDelete = () => {
    onProductDelete(product._id);
  };

  const handleLikeClick = () => {
    onProductLike(product);
  };
  const up = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div onClick={() => up()} className="card">
      <div className="card__sticky card__sticky_type_top-left">
        {!!product.discount && (
          <span className="card__discount">-{discount}%</span>
        )}
      </div>
      <div className="card__sticky card__sticky_type_top-right">
        <button
          className={`card__favorite ${
            isLiked ? "card__favorite_active" : "card__favorite_not_active"
          }`}
          onClick={handleLikeClick}
        >
          <Like className="card__liked" />
        </button>
      </div>
      <Link to={`/product/${product._id}`} className="card__link">
        <img src={pictures} alt="card__image" className="card__image" />
        <div className="card__desc">
          <span className="card__price">{price}p</span>
          <span className="card_wight">{wight}</span>
          <p className="card__name">{name}</p>
        </div>
      </Link>
      <span
        onClick={() => setParentCounter((state) => state + 1)}
        className="card__card btn btn_type_primary"
      >
        В корзину
      </span>
      <span
        onClick={() => handleDelete()}
        className="card__card btn btn_type_primary"
      >
        Удалить товар
      </span>
    </div>
  );
};

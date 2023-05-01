import { CardContext } from "../../context/cardContext";
import { Card } from "../Card/Card";
import "./index.css";
import { useContext } from "react";

export const CardList = ({ cards }) => {
  const { setParentCounter, handleProductLike } = useContext(CardContext);

  return (
    <div className="cards">
      {cards.map((item) => {
        return (
          <Card
            product={item}
            onProductLike={handleProductLike}
            setParentCounter={setParentCounter}
            {...item}
            key={item._id}
          />
        );
      })}
    </div>
  );
};

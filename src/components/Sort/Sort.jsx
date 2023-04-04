import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import "./index.css";

export const Sort = () => {
  const { setSort } = useContext(UserContext);
  const sortedItems = [
    { id: "Популярные" },
    { id: "Новинки" },
    { id: "Сначала дешевые" },
    { id: "Сначала дорогие" },
    { id: "По скидке" },
  ];

  return (
    <div className="sort_cards">
      {sortedItems.map((e) => (
        <span key={e.id} className="sort_item" onClick={() => setSort(e.id)}>
          {e.id}
        </span>
      ))}
    </div>
  );
};

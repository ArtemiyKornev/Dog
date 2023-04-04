import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CardList } from "../../components/CardList/CardList";
import { CardContext } from "../../context/cardContext";
import "./index.scss";

export const Favorites = () => {
  const { favorites } = useContext(CardContext);

  const navigate = useNavigate();

  return (
    <div className="favorites">
      <span className="favorites__back" onClick={() => navigate(-1)}>
        {"< "}Назад
      </span>
      <h1>Избранное</h1>
      {!!favorites.length ? (
        <CardList cards={favorites} />
      ) : (
        <div className="not-found">Вы не добавили ни одного товара</div>
      )}
    </div>
  );
};

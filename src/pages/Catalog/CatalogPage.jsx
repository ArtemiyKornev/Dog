import { useContext } from "react";
import { CardList } from "../../components/CardList/CardList";
import { CardContext } from "../../context/cardContext";
import { UserContext } from "../../context/userContext";
import { getIssues } from "../../utils/utils";
import { Sort } from "../../components/Sort/Sort";
import "./index.css";

export const CatalogPage = ({}) => {
  const { cards } = useContext(CardContext);
  const { searchQuery } = useContext(UserContext);
  return (
    <>
      {searchQuery && (
        <p>
          По запросу {searchQuery} найдено {cards.length}
          {getIssues(cards.length)}
        </p>
      )}
      <Sort></Sort>
      <CardList cards={cards} />
    </>
  );
};

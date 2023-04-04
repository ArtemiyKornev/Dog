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
  // const sortedItems = [{id: 'newest'}, {id: 'popular'}, {id:'cheapest'}, {id: 'richest'}]
  return (
    <>
      {searchQuery && (
        <p>
          По запросу {searchQuery} найдено {cards.length}
          {getIssues(cards.length)}
        </p>
      )}
      {/* <div className='sort-cards'> 
  {sortedItems.map((e)=>
  <span key={e.id} className='sort-item' onClick={() => setSort(e.id)}>{e.id}</span>
  )}  
  </div> */}
      <Sort></Sort>

      <CardList />
    </>
  );
};

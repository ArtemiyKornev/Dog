import React, { useContext, useEffect, useState } from "react";
import { Logo } from "../Logo/Logo";
import { Search } from "../Search/Search";
import "./style.css";
import IconBasket from "./IconBasket";
import { UserContext } from "../../context/userContext";
import { CardContext } from "../../context/cardContext";
import { Link } from "react-router-dom";
import { ReactComponent as Like } from '../Card/like.svg';
import { api } from "../../utils/api";

export const Header = () => {
  // const [state, setState] = useState(false);
  const { currentUser, searchQuery, setSearchQuery, parentCounter } = useContext(UserContext);
  const [counter, setCounter] = useState(parentCounter);
  const { favorites } = useContext(CardContext);
  // useEffect(()=>{
  //   setCounter(counter + 1);
  // }, [state, parentCounter]);
 
  //use effect для корзины
  useEffect(() => {
    // добавил 23 сам чтобы корзина срабатывала сразу
    if (parentCounter === 0) return;
    setCounter((state) => state + 1);
    return () => setCounter(parentCounter);
  }, [parentCounter]);
  const addProd = async () => {
    await api.addProduct();
   };

  return (
    <div className="header" id="head">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
          <div> Войти </div>
          <button onClick={() => addProd } >Добавить продукт</button>
          <IconBasket count={parentCounter} />
        </div>
        <div>
            <Link to={"/favorites"} className="header__bubble-link">
              <Like className="header__liked" />
              {favorites.length !== 0 && <span className="header__bubble">{favorites.length}</span>}
              {/* {favorites.length} */}
            </Link>
          </div>
        <span> {currentUser.name} </span>
        <span> {currentUser.email} </span>
        <span> {currentUser.about} </span>
        <div> </div>
      </div>
    </div>
  );
};

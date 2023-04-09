import React, { useContext, useEffect, useState } from "react";
import { Logo } from "../Logo/Logo";
import { ReactComponent as Vector } from "./Vector.svg";
import { Search } from "../Search/Search";
import "./style.css";
import IconBasket from "./IconBasket";
import { UserContext } from "../../context/userContext";
import { CardContext } from "../../context/cardContext";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Like } from "../Card/like.svg";
import { ReactComponent as Login } from "./login.svg";
import { api } from "../../utils/api";

export const Header = ({ setShowModal }) => {
  // const [state, setState] = useState(false);
  const {
    currentUser,
    searchQuery,
    setSearchQuery,
    parentCounter,
    isAuthentificated,
  } = useContext(UserContext);
  const [counter, setCounter] = useState(parentCounter);
  const { favorites } = useContext(CardContext);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  // useEffect(()=>{
  //   setCounter(counter + 1);
  // }, [state, parentCounter]);

  //use effect для корзины
  useEffect(() => {
    if (parentCounter === 0) return;
    setCounter((state) => state + 1);
    return () => setCounter(parentCounter);
  }, [parentCounter]);

  //добавление продукта из api.js
  // const addProd = async () => {
  //   await api.addProduct();
  // };

  return (
    <div className="header" id="head">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
          <div className="icons">
            <Link to={"/favorites"} className="header__bubble-link">
              <Like className="header__liked" />
              {favorites.length !== 0 && (
                <span className="header__bubble">{favorites.length}</span>
              )}
            </Link>
          </div>
          <IconBasket count={parentCounter} />
          <Vector />
          {!isAuthentificated ? (
            <Link
              to={"/login"}
              className="header__bubble-link"
              onClick={() => setShowModal(true)}
            >
              <Login />
            </Link>
          ) : (
            <span onClick={handleLogout}> Logout</span>
          )}

          {/*  добавление продукта из api.js <button className="btn__addproduct" onClick={() => addProd()}>
            Добавить продукт
          </button> */}
        </div>
        <span> {currentUser.name}, </span>
        {/* <span> {currentUser.email} </span> */}
        <span> {currentUser.about} </span>
      </div>
    </div>
  );
};

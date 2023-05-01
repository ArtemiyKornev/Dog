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
import { AddProduct } from "../AddProduct/AddProduct";
import { BaseButton } from "../BaseButton/BaseButon";
import { Form } from "../Form/Form";
import { useForm } from "react-hook-form";
import { Modal } from "../Modal/Modal";

export const Header = ({ setShowModal, id, product }) => {
  const { searchQuery, setSearchQuery, parentCounter, isAuthentificated } =
    useContext(UserContext);
  const [counter, setCounter] = useState(parentCounter);
  const { favorites } = useContext(CardContext);
  const [createModal, setCreateModal] = useState(false);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    if (parentCounter === 0) return;
    setCounter((state) => state + 1);
    return () => setCounter(parentCounter);
  }, [parentCounter]);

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
          <IconBasket count={parentCounter} clickFunction={() => {}} />
          <Link
            to={"/profile "}
            className="header__bubble-link"
            onClick={() => setShowModal(true)}
          >
            <Vector className="header__liked" />
          </Link>

          {!isAuthentificated ? (
            <Link
              to={"/login"}
              className="header__bubble-link"
              onClick={() => setShowModal(true)}
            >
              <Login />
            </Link>
          ) : (
            <span onClick={handleLogout}> </span>
          )}
          <button
            className="btn btn_type_primary "
            color={"yellow"}
            onClick={() => setCreateModal(true)}
          >
            Добавить продукт
          </button>
          {createModal && (
            <Modal activeModal={AddProduct} setShowModal={setCreateModal}>
              <AddProduct
                id={id}
                product={product}
                setCreateModal={setCreateModal}
              />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

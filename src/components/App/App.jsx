// import { Card } from '../Card/Card';
// import { CardList } from '../CardList/CardList';
import React, { useEffect, useState } from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
// import data from "../../data/data.json";
import "./App.scss";
import { api } from "../../utils/api";
import { findLike, useDebounce } from "../../utils/utils";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
// import {Product} from '../Product/Product';
import { CatalogPage } from "../../pages/Catalog/CatalogPage";
import { ProductPage } from "../../pages/Product/ProductPage";
import { FaqPage } from "../../pages/FAQ/FaqPage";
import { Favorites } from "../../pages/Favorites/FavoritesPage";
import { NotFound } from "../../pages/NotFound/NotFound";
import { UserContext } from "../../context/userContext";
import { CardContext } from "../../context/cardContext";
// import { Form } from "../Form/Form";
import { Modal } from "../Modal/Modal";
import { Login } from "../Auth/Login/Login";
import { Register } from "../Auth/Register/Register";
import { ResetPassword } from "../Auth/ResetPassword/ResetPassword";
import { parseJwt } from "../../utils/parseJWT";

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState(undefined);
  const [parentCounter, setParentCounter] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [favorites, setFavorites] = useState([]);
  // const [formData, setFormData] = useState([]);
  const [activeModal, setShowModal] = useState(false);
  const [isAuthentificated, setIsAuthentificated] = useState(false);

  // показ продуктов с фильтрацией по id пользователя
  // const filteredCards = (products, id) =>
  //   products.filter((e) => e.author._id === id);
  //  показ всех продуктов
  const filteredCards = (products, _id) => {
    return products;
  };
  // поиск товара
  const handleSearch = (search) => {
    api
      .searchProducts(search)
      .then((data) => setCards(filteredCards(data, currentUser._id)));
  };

  const debounceValueInApp = useDebounce(searchQuery, 500);

  // функция по нажатию/отжатию лайка с фильтрацией по id пользователя
  function handleProductLike(product) {
    // понимаем , отлайкан ли продукт
    const isLiked = findLike(product, currentUser);
    //Если не отлайкан, значит действие было совершено для добавления лайка
    return isLiked
      ? // Если товар был с лайком, значит было действие по удалению лайка
        api.deleteLike(product._id).then((newCard) => {
          // newCard - карточка с уже изменненым количеством лайков
          const newCards = cards.map((e) =>
            e._id === newCard._id ? newCard : e
          );
          setCards(filteredCards(newCards, currentUser._id));
          setFavorites((state) => state.filter((f) => f._id !== newCard._id));
          return newCard;
        })
      : // Если не отлайкан, значит действие было совершено для добавления лайка.
        api.addLike(product._id).then((newCard) => {
          const newCards = cards.map((e) =>
            e._id === newCard._id ? newCard : e
          );
          setCards(filteredCards(newCards, currentUser._id));
          setFavorites((favor) => [...favor, newCard]);
          return newCard;
        });
  }

  // с фильтрацией по id пользователя
  useEffect(() => {
    if (debounceValueInApp === undefined) return;
    handleSearch(debounceValueInApp);
  }, [debounceValueInApp]);

  //  Первоначальная загрузка продуктов и данных пользователя
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getProductList()]).then(
      ([userData, productData]) => {
        // сеттим юзера
        setCurrentUser(userData);
        const items = filteredCards(productData.products, userData._id);
        // сеттим карточки
        setCards(items);
        // получаем отлайканные нами карточки
        const favor = items.filter((e) => findLike(e, userData));
        // сеттим карточки в избранный стейт
        setFavorites(favor);
      }
    );
  }, [isAuthentificated]);
  // сортировка продуктов
  const setSortCards = (sort) => {
    if (sort === "Сначала дешевые") {
      const newCards = cards.sort((a, b) => a.price - b.price);
      setCards([...newCards]);
    }
    if (sort === "Сначала дорогие") {
      const newCards = cards.sort((a, b) => b.price - a.price);
      setCards([...newCards]);
    }
    if (sort === "Популярные") {
      const newCards = cards.sort((a, b) => b.likes.length - a.likes.length);
      setCards([...newCards]);
    }
    if (sort === "Новинки") {
      const newCards = cards.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
      setCards([...newCards]);
    }
    if (sort === "По скидке") {
      const newCards = cards.sort((a, b) => b.discount - a.discount);
      setCards([...newCards]);
    }
  };
  // удаление продукта
  const onProductDelete = async (id) => {
    try {
      const res = await api.deleteProduct(id);
      setCards((state) => state.filter((e) => e._id !== res._id));
    } catch (error) {
      alert("Нельзя удалить чужой товар");
    }
  };
  // контекст
  const contextValue = {
    setSort: setSortCards,
    currentUser,
    searchQuery,
    setSearchQuery,
    parentCounter,
    setParentCounter,
    isAuthentificated,
  };
  const contextCardValue = {
    cards,
    setParentCounter,
    handleProductLike,
    onProductDelete,
    favorites,
    setFavorites,
  };

  // проверка авторизации пользователя
  const navigate = useNavigate();
  // uncodedToken-parseJWT - раскладка токена (jwt.io)
  useEffect(() => {
    const token = localStorage.getItem("token");
    // const authPath = ["/reset-password", "/register"];
    const uncodedToken = parseJwt(token);
    if (uncodedToken?._id) {
      setIsAuthentificated(true);
    }
    // else if (!authPath.includes(location.pathname)) {
    //   navigate("/login");
    // }
  }, [navigate]);

  return (
    <>
      <UserContext.Provider value={contextValue}>
        <CardContext.Provider value={contextCardValue}>
          {/*Header*/}
          <Header setShowModal={setShowModal} />
          {/*content*/}
          {isAuthentificated ? (
            <main className="content container">
              <Routes>
                <Route path="/" element={<CatalogPage />}></Route>
                <Route
                  path="/product/:productId"
                  element={<ProductPage setParentCounter={setParentCounter} />}
                ></Route>
                <Route path="faq" element={<FaqPage />}></Route>
                <Route path="favorites" element={<Favorites />}></Route>
                <Route
                  path="login"
                  element={
                    <Modal
                      activeModal={activeModal}
                      setShowModal={setShowModal}
                    >
                      {" "}
                      <Login setShowModal={setShowModal} />{" "}
                    </Modal>
                  }
                ></Route>
                <Route
                  path="register"
                  element={
                    <Modal
                      activeModal={activeModal}
                      setShowModal={setShowModal}
                    >
                      {" "}
                      <Register setShowModal={setShowModal} />{" "}
                    </Modal>
                  }
                ></Route>
                <Route
                  path="reset-password"
                  element={
                    <Modal
                      activeModal={activeModal}
                      setShowModal={setShowModal}
                    >
                      {" "}
                      <ResetPassword setShowModal={setShowModal} />{" "}
                    </Modal>
                  }
                ></Route>
                <Route path="*" element={<NotFound />}></Route>
              </Routes>
            </main>
          ) : (
            <div className="not__auth">
              {" "}
              Пожалуйста авторизуйтесь
              <Routes>
                <Route
                  path="login"
                  element={
                    <Modal
                      activeModal={activeModal}
                      setShowModal={setShowModal}
                    >
                      {" "}
                      <Login setShowModal={setShowModal} />{" "}
                    </Modal>
                  }
                ></Route>
                <Route
                  path="register"
                  element={
                    <Modal
                      activeModal={activeModal}
                      setShowModal={setShowModal}
                    >
                      {" "}
                      <Register setShowModal={setShowModal} />{" "}
                    </Modal>
                  }
                ></Route>
                <Route
                  path="reset-password"
                  element={
                    <Modal
                      activeModal={activeModal}
                      setShowModal={setShowModal}
                    >
                      {" "}
                      <ResetPassword setShowModal={setShowModal} />{" "}
                    </Modal>
                  }
                ></Route>
              </Routes>
            </div>
          )}
          <Footer />
        </CardContext.Provider>
      </UserContext.Provider>
    </>
  );
}
export default App;

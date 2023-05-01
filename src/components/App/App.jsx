import React, { useEffect, useState } from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import "./App.scss";
import { api } from "../../utils/api";
import { findLike, useDebounce } from "../../utils/utils";
import { Route, Routes, useNavigate } from "react-router-dom";
import { CatalogPage } from "../../pages/Catalog/CatalogPage";
import { ProductPage } from "../../pages/Product/ProductPage";
import { FaqPage } from "../../pages/FAQ/FaqPage";
import { Favorites } from "../../pages/Favorites/FavoritesPage";
import { NotFound } from "../../pages/NotFound/NotFound";
import { UserContext } from "../../context/userContext";
import { CardContext } from "../../context/cardContext";
import { Modal } from "../Modal/Modal";
import { Login } from "../Auth/Login/Login";
import { Register } from "../Auth/Register/Register";
import { ResetPassword } from "../Auth/ResetPassword/ResetPassword";
import { parseJwt } from "../../utils/parseJWT";
import { UserProfile } from "../../pages/Profile/Profile";

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState(undefined);
  const [parentCounter, setParentCounter] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [activeModal, setShowModal] = useState(false);
  const [isAuthentificated, setIsAuthentificated] = useState(false);

  const filteredCards = (products, id) =>
    products.filter((e) => e.author._id === id);
  //  показ всех продуктов
  // const filteredCards = (products, _id) => {
  //   return products;
  // };

  const handleSearch = (search) => {
    api
      .searchProducts(search)
      .then((data) => setCards(filteredCards(data, currentUser._id)));
  };

  const debounceValueInApp = useDebounce(searchQuery, 500);

  function handleProductLike(product) {
    const isLiked = findLike(product, currentUser);
    isLiked
      ? api.deleteLike(product._id).then((newCard) => {
          const newCards = cards.map((e) =>
            e._id === newCard._id ? newCard : e
          );
          setCards(filteredCards(newCards, currentUser._id));
          setFavorites((state) => state.filter((f) => f._id !== newCard._id));
        })
      : api.addLike(product._id).then((newCard) => {
          const newCards = cards.map((e) =>
            e._id === newCard._id ? newCard : e
          );
          setCards(filteredCards(newCards, currentUser._id));
          setFavorites((favor) => [...favor, newCard]);
        });
    return isLiked;
  }

  useEffect(() => {
    if (debounceValueInApp === undefined) return;
    handleSearch(debounceValueInApp);
  }, [debounceValueInApp]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getProductList()]).then(
      ([userData, productData]) => {
        setCurrentUser(userData);
        const items = filteredCards(productData.products, userData._id);
        setCards(items);
        const favor = items.filter((e) => findLike(e, userData));
        setFavorites(favor);
      }
    );
  }, [isAuthentificated]);

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

  const onProductDelete = async (id) => {
    try {
      const res = await api.deleteProduct(id);
      setCards((state) => state.filter((e) => e._id !== res._id));
    } catch (error) {
      alert("Нельзя удалить чужой товар");
    }
  };

  const contextValue = {
    setSort: setSortCards,
    currentUser,
    setCurrentUser,
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

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const uncodedToken = parseJwt(token);
    if (uncodedToken?._id) {
      setIsAuthentificated(true);
    }
  }, [navigate]);

  return (
    <>
      <UserContext.Provider value={contextValue}>
        <CardContext.Provider value={contextCardValue}>
          <Header setShowModal={setShowModal} />
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
                <Route path="profile" element={<UserProfile />}></Route>
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

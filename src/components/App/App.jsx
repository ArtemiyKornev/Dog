// import { Card } from '../Card/Card';
// import { CardList } from '../CardList/CardList';
import React, { useEffect, useState } from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
// import data from "../../data/data.json";
import "./App.scss";
import { api } from "../../utils/api";
import { findLike, useDebounce } from "../../utils/utils";
import { Route, Routes } from "react-router-dom";
// import {Product} from '../Product/Product';
import { CatalogPage } from "../../pages/Catalog/CatalogPage";
import { ProductPage } from "../../pages/Product/ProductPage";
import { FaqPage } from "../../pages/FAQ/FaqPage";
import { Favorites } from "../../pages/Favorites/FavoritesPage";
import { NotFound } from "../../pages/NotFound/NotFound";
import { UserContext } from "../../context/userContext";
import { CardContext } from "../../context/cardContext";


function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState(undefined);
  const [parentCounter, setParentCounter] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [favorites, setFavorites] = useState([]);
  
  
  // с фильтрацией по id пользователя
  // const filteredCards = (products, id) => products.filter((e) => e.author._id === id);
  //  или products для всех продуктов
  const filteredCards = (products, id) => {
    return products
  };
  
  const handleSearch = (search) => {
    api.searchProducts(search).then((data) => setCards(filteredCards(data, currentUser._id)));
  };
  const debounceValueInApp = useDebounce(searchQuery, 500);

  // с фильтрацией по id пользователя
  function handleProductLike(product) {
    // понимаем , отлайкан ли продукт
    const isLiked = findLike(product, currentUser);
    isLiked
      ? // Если товар был с лайком, значит было действие по удалению лайка
        api.deleteLike(product._id).then((newCard) => {
          // newCard - карточка с уже изменненым количеством лайков
          const newCards = cards.map((e) =>
            e._id === newCard._id ? newCard : e
          );
          setCards(filteredCards(newCards, currentUser._id));
          setFavorites((state) => state.filter((f) => f._id !== newCard._id));
        })
      : // Если не отлайкан, значит действие было совершено для добавления лайка.
        api.addLike(product._id).then((newCard) => {
          const newCards = cards.map((e) =>
            e._id === newCard._id ? newCard : e);
          setCards(filteredCards(newCards, currentUser._id));
          setFavorites((favor) => [...favor, newCard]);
        });
  }

  // с фильтрацией по id пользователя
  useEffect(() => {
    if (debounceValueInApp === undefined) return;
    handleSearch(debounceValueInApp);
  }, [debounceValueInApp]);

  //  Первоначальная загрузка карточек/продуктов/постов/сущностей и данных юзера
   useEffect(() => {
    Promise.all([api.getUserInfo(), api.getProductList()]).then(
      ([userData, productData]) => {
        // сеттим юзера
        setCurrentUser(userData);
        const items = filteredCards(productData.products, userData._id);
        // сеттим карточки
        setCards(items);
        // получаем отлайканные нами карточки
        const fav = items.filter((e) => findLike(e, userData));
        // сеттим карточки в избранный стейт
        setFavorites(fav);
      }
    );
  }, []);
 

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
    setCards((state) => state.filter(e => e._id !== res._id))
    } catch (error) {
      alert('Нельзя удалить чужой товар');
    }
  };
 

  const contextValue = {
    setSort: setSortCards,
    currentUser,
    searchQuery,
    setSearchQuery,
    parentCounter,
    setParentCounter,
  };
  const contextCardValue = {
    cards,
    setParentCounter,
    handleProductLike,
    onProductDelete,
    favorites,
    setFavorites
  };
  return (
    <>
      <UserContext.Provider value={contextValue}>
        <CardContext.Provider value={contextCardValue}>
          {/*Header*/}
          <Header />

          {/*content*/}
          <main className="content container">
            
            <Routes>
              <Route path="/" element={<CatalogPage />}></Route>
              <Route
                path="/product/:productId"
                element={<ProductPage setParentCounter={setParentCounter} />}
              ></Route>
              <Route path="faq" element={<FaqPage/>}></Route>
              <Route path="favorites" element={<Favorites/>}></Route>
              <Route path="*" element={<NotFound/>}></Route>
            </Routes>

            {/* Card */}
            {/* <div className='content__cards'>  </div> */}
            {/* <CardList
      handleProductLike={handleProductLike}
      currentUser={currentUser} 
      setParentCounter={setParentCounter} 
      cards={cards}  />

      <Product currentUser={currentUser}/> */}
          </main>
          <Footer />
        </CardContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;

//useEffect(()=> {}) - апдейт на каждое изменение компонента
//useEffect(()=> {}, {state}) - апдейт на каждое изменение  конкретного state
//useEffect(()=> {}, []) - апдейт в самом начале

// чистая функция это функция которая при одних и тех же параметрах возвращает одинаковый результат

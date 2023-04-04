import s from "./index.module.scss";
import truck from "./img/truck.svg";
import quality from "./img/quality.svg";
import cn from "classnames";
import { ReactComponent as Save } from "./img/save.svg";
import { useContext, useEffect, useState } from "react";
import { api } from "../../utils/api";
import { 
  useLocation,
  useNavigate,
  useParams } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { CardContext } from "../../context/cardContext";
import { findLike } from "../../utils/utils";

// const product_id = '622c781877d63f6e70967d29';

export const Product = ({ id }) => {
  const [product, setProduct] = useState({});
  useEffect(() => {
    api.getProductById(id).then((data) => setProduct(data));
  }, [id]);

  // const navigate = useNavigate();
  // const params = useParams();
  
  const currentUser = useContext(UserContext);
  const setParentCounter = useContext(CardContext);
  const handleProductLike = useContext(CardContext);
  const isLiked = findLike(product, currentUser);
  
  const [productCount, setProductCount] = useState(0);
  const location = useLocation();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (location.search.includes("budget=3000")) {
      // navigate('/part1')
      // alert('you are really rich man');
    }
  }, []);

  const [showEdit, setShowEdit] = useState(false);
  const [newName, setNewName] = useState(product?.name ?? '');
  const [newPrice, setNewPrice] = useState(product?.price ?? 0);
  
  // useEffect(() => {
  //   // const isLiked = product?.likes?.some((el) => el === currentUser._id);
  //   setLiked(isLiked);
  // }, [product.likes?.length, product?.likes, currentUser]);


  const handleLike = () => {
    handleProductLike(product, isLiked);
    setLiked((st) => !st);
  };

    const handleEditProduct = async () => {
    await api.editProductById(product._id, {name: newName || product.name, price: newPrice || product.price} );
    setShowEdit(false);
    };

  return (
    <>
      <div className={s.product}>
        <div className={s.imgWrapper}>
          <img className={s.img} src={product.pictures} alt={`Изображение`} />
          {/* {['sale'].map((e) => <span className='tag tag_type_sale'>{e}</span>)} */}
          {product.tags?.map((e) => (
            <span className={`tag tag_type_${e}`}>{e}</span>
          ))}
        </div>
        <div className={s.desc}>
        <span className={s.name}>{product.name} </span>
          <span className={s.price}>{product.price} &nbsp;₽</span>

          {product.discount && (
            <span className={`${s.price} card__price_type_discount`}>
              {product.discount} &nbsp;%
            </span>
          )}

          <div className={s.controls}>
            <div className={s.controls__left}>
              <button
                className={s.controls__minus}
                onClick={() =>
                  productCount > 0 && setProductCount((state) => state - 1)
                }
              >
                -
              </button>
              <span className={s.controls__num}>{productCount}</span>
              <button
                className={s.controls__plus}
                onClick={() => setProductCount((state) => state + 1)}
              >
                +
              </button>
            </div>
            <button
              onClick={() => setParentCounter((state) => state + productCount)}
              className={`btn btn_type_primary ${s.controls__cart}`}>
              В корзину
            </button>
          </div>
          <button
            onClick={handleLike}
            className={cn(s.favorite, { [s.favoriteActive]: isLiked })}
          >
            <Save />
            <span>{isLiked ? "В избранном" : "В избранное"}</span>
          </button>
          <div className={s.delivery}>
            <img src={truck} alt="truck" />
            <div className={s.right}>
              <h3 className={s.name}>Доставка по всему Миру!</h3>
              <p className={s.text}>
                Доставка курьером — <span className={s.bold}>от 399 ₽</span>
              </p>
            </div>
          </div>
          <div className={s.delivery}>
            <img src={quality} alt="quality" />
            <div className={s.right}>
              <h3 className={s.name}>Доставка по всему Миру!</h3>
              <p className={s.text}>
                Доставка курьером — <span className={s.bold}>от 399 ₽</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={s.box}>

        {showEdit && <div>
          <div className={s.edit}>
          <input type='text' placeholder="Изменить название продукта" onChange={(e)=> setNewName(e.target.value)}
          defaultValue={newName}
          />
          <input type='number' placeholder="Изменить цену продукта" onChange={(e)=> setNewPrice(e.target.value)}
          defaultValue={product.price}
          />
          <button
              onClick={handleEditProduct}
              className={`btn btn_type_primary ${s.cart}`}
            >
              Редактировать
            </button>
          </div>
          </div>}
          <button
              onClick={() => setShowEdit(true)}
              className={`btn btn_type_primary ${s.cart}`}
            >
              Редактировать товар
            </button>
            {/* <button
              onClick={handleDeleteProduct}
              className={`btn btn_type_primary ${s.cart}`}
            >
              Удалить товар
            </button> */}
        <h2 className={s.title}>Описание</h2>
        <div>{product.description}</div>
        <h2 className={s.title}>Характеристики</h2>
        <div className={s.grid}>
          <div className={s.naming}>Вес</div>
          <div className={s.description}>1 шт {product.wight}</div>
          <div className={s.naming}>Цена</div>
          <div className={s.description}>
            {product.price}₽ за {product.wight}
          </div>
          <div className={s.naming}>Польза</div>
          <div className={s.description}>
            <p>
              Большое содержание аминокислот и микроэлементов оказывает
              положительное воздействие на общий обмен веществ собаки.
            </p>
            <p>Способствуют укреплению десен и жевательных мышц.</p>
            <p>
              Развивают зубочелюстной аппарат, отвлекают собаку во время смены
              зубов.
            </p>
            <p>
              Имеет цельную волокнистую структуру, при разжевывание получается
              эффект зубной щетки, лучше всего очищает клыки собак.
            </p>
            <p>Следует учесть высокую калорийность продукта.</p>
          </div>
        </div>
      </div>
    </>
  );
};

import s from "./index.module.scss";
import truck from "./img/truck.svg";
import quality from "./img/quality.svg";
import cn from "classnames";
import { ReactComponent as Save } from "./img/save.svg";
import { useContext, useEffect, useState } from "react";
import { api } from "../../utils/api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { CardContext } from "../../context/cardContext";
import { findLike } from "../../utils/utils";
import { Rating } from "../Rating/Rating";

export const Product = ({ id }) => {
  const [product, setProduct] = useState({});
  const [rate, setRate] = useState(3);
  const [currentRating, setCurrentRating] = useState(0);

  useEffect(() => {
    api.getProductById(id).then((data) => setProduct(data));
  }, [id]);

  const navigate = useNavigate();
  const params = useParams();

  const { currentUser } = useContext(UserContext);
  const { setParentCounter, handleProductLike } = useContext(CardContext);

  const [productCount, setProductCount] = useState(1);

  const isLiked = findLike(product, currentUser);

  const [showEdit, setShowEdit] = useState(false);
  const [newName, setNewName] = useState(product?.name ?? "");
  const [newPrice, setNewPrice] = useState(product?.price ?? 0);

  const handleLike = async () => {
    const newProduct = await handleProductLike(product);
    console.log(newProduct);
    setProduct(newProduct);
  };

  const handleEditProduct = async () => {
    await api.editProductById(product._id, {
      name: newName || product.name,
      price: newPrice || product.price,
    });
    setShowEdit(false);
  };
  useEffect(() => {
    if (!product?.reviews) return;
    const rateAcc = product.reviews.reduce(
      (acc, el) => (acc = acc + el.rating),
      0
    );
    const accum = Math.floor(rateAcc / product.reviews.length);
    setRate(accum);
    setCurrentRating(accum);
  }, [product?.reviews]);

  return (
    <>
      <div>
        <span className="auth__info" onClick={() => navigate(-1)}>
          {" "}
          {"<"} Назад{" "}
        </span>
        <h1> {product.name} </h1>
        <div className={s.rateInfo}>
          <span>
            {" "}
            Артикул <b> 2398432</b>
          </span>
          <Rating rate={rate} setRate={setRate} currentRating={currentRating} />
          <span>{product?.reviews?.length} отзывов </span>
        </div>
      </div>
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
                  productCount > 1 && setProductCount((state) => state - 1)
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
              className={`btn btn_type_primary ${s.controls__cart}`}
            >
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
        {showEdit && (
          <div>
            <div className={s.edit}>
              <input
                type="text"
                placeholder="Изменить название продукта"
                onChange={(e) => setNewName(e.target.value)}
                defaultValue={newName}
              />
              <input
                type="number"
                placeholder="Изменить цену продукта"
                onChange={(e) => setNewPrice(e.target.value)}
                defaultValue={product.price}
              />
              <button
                onClick={handleEditProduct}
                className={`btn btn_type_primary ${s.cart}`}
              >
                Редактировать
              </button>
            </div>
          </div>
        )}
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
      <div> Отзывы </div>
    </>
  );
};

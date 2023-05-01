import s from "./index.module.scss";
import truck from "./img/truck.svg";
import quality from "./img/quality.svg";
import cn from "classnames";
import { ReactComponent as Save } from "./img/save.svg";
import { ReactComponent as Basket } from "./img/basket.svg";
import { useContext, useEffect, useState } from "react";
import { api } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { CardContext } from "../../context/cardContext";
import { Rating } from "../Rating/Rating";
import { openNotification } from "../Notification/Notification";
import { Modal } from "../Modal/Modal";
import { Form } from "../Form/Form";
import { useForm } from "react-hook-form";
import { BaseButton } from "../BaseButton/BaseButon";
import { EditProduct } from "../EditProduct/EditProduct";

export const Product = ({
  id,
  product,
  onProductLike,
  currentUser,
  onSendReview,
}) => {
  const [rate, setRate] = useState(5);
  const [users, setUsers] = useState([]);
  const [currentRating, setCurrentRating] = useState(0);
  const [rewiewsProduct, setRewiewsProduct] = useState(
    product.reviews.slice(0, 10) ?? []
  );
  const navigate = useNavigate();
  const { setParentCounter } = useContext(CardContext);
  const [updateModal, setUpdateModal] = useState(false);
  const [productCount, setProductCount] = useState(1);
  const [isLikedProduct, setIsLikedProduct] = useState(false);

  useEffect(() => {
    const isLiked = product?.likes?.some((el) => el === currentUser._id);
    setIsLikedProduct(isLiked);
  }, [product.likes]);

  const handleLike = (e) => {
    onProductLike(product);
    setIsLikedProduct((state) => !state);
  };

  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset } = useForm({ mode: "onSubmit" });

  const sendReview = async (data) => {
    const newProduct = await api.addReviewProduct(product._id, {
      text: data.review,
      rating: rate,
    });
    try {
      onSendReview(newProduct);
      setRewiewsProduct((state) => [...newProduct.reviews]);
      setShowForm(false);
      reset();
      openNotification("success", "Успешно", "Ваш отзыв успешно отправлен");
    } catch (error) {
      openNotification("error", "Ошибка", "Ваш отзыв отправить не удалось");
    }
  };
  const deleteReview = async (id) => {
    const result = await api.deleteReviewProduct(product._id, id);
    setRewiewsProduct(() => [...result.reviews]);
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

  useEffect(() => {
    api.getUsers().then((data) => setUsers(data));
  }, []);

  const getUser = (id) => {
    if (!users.length) return "User";
    const user = users.find((e) => e._id === id);
    return user?.name ?? "Артемий";
  };

  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const textRegister = register("review", {
    required: "Необходимо заполнить отзыв",
  });

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
          <Rating rate={currentRating} setRate={() => {}} />
          <span>{product?.reviews?.length} отзывов </span>
        </div>
      </div>
      <div className={s.product}>
        <div className={s.imgWrapper}>
          <img className={s.img} src={product.pictures} alt={`Изображение`} />

          {product.tags?.map((e) => (
            <span key={e} className={`tag tag_type_${e}`}>
              {e}
            </span>
          ))}
        </div>
        <div className={s.desc}>
          <span className={s.name}>{product.name} </span>
          <span className={s.price}>{product.price} &nbsp;₽</span>
          {!!product.discount && (
            <span className={`${s.price} card__price_type_discount`}>
              - {product.discount}&nbsp;%
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
            className={cn(s.favorite, { [s.favoriteActive]: isLikedProduct })}
            onClick={(e) => handleLike(e)}
          >
            <Save />
            <span>{isLikedProduct ? "В избранном" : "В избранное"}</span>
          </button>
          <div className={s.delivery}>
            <img src={truck} alt="truck" />
            <div className={s.right}>
              <h3 className={s.name}>Доставка по всему Миру!</h3>
              <p className={s.text}>
                Доставка курьером — <span className={s.bold}>от 399 ₽</span>
              </p>
              <p className={s.text}>
                Доставка в пункт выдачи —{" "}
                <span className={s.bold}>от 199 ₽</span>
              </p>
            </div>
          </div>
          <div className={s.delivery}>
            <img src={quality} alt="quality" />
            <div className={s.right}>
              <h3 className={s.name}>Гарантия качества</h3>
              <p className={s.text}>
                Если Вам не понравилось качество нашей продукции, мы вернем
                деньги, либо сделаем все возможное, чтобы удовлетворить ваши
                нужды.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <BaseButton color={"yellow"} onClick={() => setUpdateModal(true)}>
          Редактировать товар
        </BaseButton>
        {updateModal && (
          <Modal activeModal={updateModal} setShowModal={setUpdateModal}>
            <EditProduct
              id={id}
              product={product}
              setUpdateModal={setUpdateModal}
            />
          </Modal>
        )}
      </div>
      <div className={s.box}>
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
      <div>
        <h2 className={s.tittle}>Отзывы</h2>{" "}
        <div className={s.review__wrapper}>
          <BaseButton color={"yellow"} onClick={() => setShowForm(true)}>
            {" "}
            Добавить отзыв{" "}
          </BaseButton>
          {showForm && (
            <Form
              className={s.review__form}
              submitForm={handleSubmit(sendReview)}
            >
              <Rating rate={rate} isEditable={true} setRate={setRate} />
              <span> </span>
              <textarea
                className={s.review__form__text}
                {...textRegister}
                placeholder="Оставьте отзыв"
              />
              <BaseButton color={"yellow"} type="submit">
                {" "}
                Отправить отзыв{" "}
              </BaseButton>
            </Form>
          )}
        </div>
        {users &&
          rewiewsProduct
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map((e) => (
              <div key={e._id} className={s.review}>
                <div className={s.review__author}>
                  <div className={s.review__info}>
                    <span>{getUser(e.author)}</span>
                    <span className={s.review__date}>
                      {new Date(e.created_at).toLocaleString("ru", options)}
                    </span>
                  </div>
                  <Rating rate={e.rating} isEditable={false} />
                </div>
                <div className={s.text}>
                  <span>{e.text}</span>
                  <Basket
                    onClick={() => deleteReview(e._id)}
                    className={s.text__img}
                  >
                    {" "}
                  </Basket>
                </div>
              </div>
            ))}
      </div>
    </>
  );
};

import { useForm } from "react-hook-form";
import "./index.css";
import { Form } from "../Form/Form";
import { BaseButton } from "../BaseButton/BaseButon";
import { api } from "../../utils/api";
import { openNotification } from "../Notification/Notification";

export const EditProduct = ({ setUpdateModal, product }) => {
  const { register, handleSubmit, reset } = useForm({ mode: "onSubmit" });

  const updProduct = async (data) => {
    try {
      await api.updateProduct(product._id, { ...data });
      setUpdateModal(false);
      reset();
      openNotification("success", "Успешно", "Описание товара успешно изменен");
    } catch (error) {
      openNotification(
        "error",
        "Ошибка",
        "Не удалось изменить описание товара"
      );
    }
  };

  return (
    <div className="edit__product">
      <span onClick={() => setUpdateModal(false)}>{"<"} Назад </span>
      <Form title={"Редактировать товар"} submitForm={handleSubmit(updProduct)}>
        <div className="edit__form__input">
          <input
            type="string"
            className="edit__product__input"
            defaultValue={product?.name}
            placeholder="Название"
            {...register("name", { required: true })}
          />
          <input
            type="number"
            className="edit__product__input"
            defaultValue={product?.price}
            placeholder="Цена"
            {...register("price", { required: true })}
          />
          <input
            type="string"
            className="edit__product__input"
            defaultValue={product?.description}
            placeholder="Описание"
            {...register("description")}
          />
          <input
            type="number"
            className="edit__product__input"
            defaultValue={product?.discount}
            placeholder="Скидка"
            {...register("discount")}
          />
        </div>
        <BaseButton className="edit__btn" color={"yellow"} type="submit">
          Сохранить
        </BaseButton>
      </Form>
    </div>
  );
};

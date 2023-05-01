import { useForm } from "react-hook-form";
import "./index.css";
import { Form } from "../Form/Form";
import { BaseButton } from "../BaseButton/BaseButon";
import { api } from "../../utils/api";
import { openNotification } from "../Notification/Notification";

export const AddProduct = ({ setCreateModal }) => {
  const { register, handleSubmit, reset } = useForm({ mode: "onSubmit" });

  const createProduct = async (data) => {
    try {
      await api.addProduct({ ...data });
      openNotification("success", "Успешно", "Товар успешно добавлен");
      setCreateModal(false);
      reset();
    } catch (error) {
      openNotification("error", "Ошибка", "Не удалось добавить товар");
    }
  };

  return (
    <div className="add__product">
      <span onClick={() => setCreateModal(false)}>{"<"} Назад</span>
      <div>
        <Form
          title={"Добавить продукт"}
          submitForm={handleSubmit(createProduct)}
        >
          <div className="add__form__input">
            <input
              type="string"
              className="add__product__input"
              placeholder="Название"
              {...register("name", { required: true })}
            />
            <input
              type="number"
              className="add__product__input"
              placeholder="Цена"
              {...register("price", { required: true })}
            />
            <input
              type="string"
              className="add__product__input"
              placeholder="Описание"
              {...register("description")}
            />
            <input
              type="string"
              className="add__product__input"
              placeholder="URL зображения"
              {...register("pictures", { required: true })}
            />
            <input
              type="string"
              className="add__product__input"
              placeholder="Вес (грамм)"
              {...register("wight")}
            />
            <input
              type="number"
              className="add__product__input"
              placeholder="Скидка (%) "
              {...register("discount")}
            />
          </div>
          <BaseButton className="add__btn" color={"yellow"} type="submit">
            Сохранить
          </BaseButton>
        </Form>
      </div>
    </div>
  );
};

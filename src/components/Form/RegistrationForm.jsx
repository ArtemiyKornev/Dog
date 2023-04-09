import { useState } from "react";
import { useForm } from "react-hook-form";
import "./index.css";

export const RegistrationForm = ({ sendData, flag = true }) => {
  const [type, setType] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log({ data });
    sendData(data);
  };

  console.log({ errors });
  return (
    <>
      <div style={{ padding: "50px" }}>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <h3>Регистрация</h3>
          <input
            type="text"
            {...register("name", {
              required: {
                message: "Это поле обязательно для заполнения",
              },
              minLength: {
                value: 2,
                message: "Такое короткое имя использовать нельзя",
              },
            })}
            placeholder="Имя"
            className="form__input"
          />
          {errors?.name && (
            <span style={{ color: "red" }}>{errors.name?.message}</span>
          )}
          <input
            type="text"
            {...register("email", {
              required: "Необходимо заполнить почту",
              pattern: {
                message: "Введите корректный e-mail",
                value:
                  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
              },
            })}
            placeholder="Email"
            className="form__input"
          />
          {errors?.email && (
            <span style={{ color: "red" }}>{errors.email?.message}</span>
          )}          
          <div className="form__eye-wrapper">
            <input
              type={type ? "text" : "password"}
              {...register("password", {
                required: "Необходимо заполнить пароль",
                pattern: {
                  message:
                    "Пароль должен содержать минимум 8 символов, одну букву латинского алфавита и одну цифру",
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                },
              })}
              placeholder="Пароль"
              className="form__input"
            />
            <span className="form__eye" onClick={() => setType(!type)}>
              {type ? "Скрыть" : "Показать"}
            </span>
          </div>          
          {errors?.password && (
            <span style={{ color: "red" }}>{errors.password?.message}</span>
          )}
          <button type="submit" className="btn btn_type_primary">
            Зарегистрироваться
          </button>
        </form>
      </div>
    </>
  );
};

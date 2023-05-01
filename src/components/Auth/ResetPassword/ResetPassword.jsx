import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../../utils/authApi";
import { pattern } from "../../../utils/validations";
import { patternEmail } from "../../../utils/emailValidations";
import { BaseButton } from "../../BaseButton/BaseButon";
import { Form } from "../../Form/Form";
import "../style.scss";

export const ResetPassword = ({ setShowModal }) => {
  const [tokenResp, setTokenResp] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });
  const [type, setType] = useState(false);

  const emailRegister = register("email", {
    required: "Email обязателен",
    patternEmail,
  });
  const passwordRegister = register("password", {
    required: tokenResp ? "Пароль обязателен" : false,
    pattern,
  });

  useEffect(() => {
    setShowModal(true);
  }, [setShowModal]);

  const sendData = async (data) => {
    if (!tokenResp) {
      try {
        const res = await authApi.resetPassword(data);
        console.log({ res });
        setTokenResp(true);
      } catch (error) {
        console.log({ error });
        alert("Что-то пошло не так");
      }
    } else {
      try {
        const res = await authApi.changePassword(data.token, {
          password: data.password,
        });
        console.log({ res });
        localStorage.setItem("token", res.token);
        navigate("/");
      } catch (error) {
        console.log({ error });
        alert("Что-то пошло не так");
      }
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <Form submitForm={handleSubmit(sendData)} title={"Восстановление пароля"}>
        <div className="auth__controls">
          <span className="auth__info">
            Для получения временного пароля необходимо ввести email, указанный
            при регистрации.
          </span>
          <input
            type="text"
            {...emailRegister}
            placeholder="Email"
            className="auth__input"
          />
          {errors?.email && (
            <span className="auth__warning">{errors.email?.message}</span>
          )}
          {tokenResp && (
            <>
              {" "}
              <div className="auth__controls">
                <input
                  type={type ? "text" : "password"}
                  {...passwordRegister}
                  placeholder="Новый пароль"
                  className="auth__input"
                  disabled={!tokenResp}
                />
                <span
                  className="form__eye-reset"
                  onClick={() => setType(!type)}
                >
                  {type ? "Скрыть" : "Показать"}
                </span>
              </div>
              {errors?.password && (
                <span className="auth__warning">
                  {errors.password?.message}
                </span>
              )}
              <input
                type={"text"}
                {...register("token", {
                  required: tokenResp ? "Токен обязателен" : false,
                })}
                placeholder="Токен"
                className="auth__input"
                disabled={!tokenResp}
              />{" "}
            </>
          )}

          <span className="auth__info auth_back" onClick={() => navigate(-1)}>
            {"< "}Назад
          </span>
          <span className="auth__info">
            Срок действия временного пароля 24 ч.
          </span>

          <div className="auth__actions">
            <BaseButton type="submit" color={"yellow"}>
              <span>Отправить</span>
            </BaseButton>
          </div>
        </div>
      </Form>
    </>
  );
};

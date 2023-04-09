import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../../utils/authApi";
import { pattern } from "../../../utils/validations";
import { BaseButton } from "../../BaseButton/BaseButon";
import { Form } from "../../Form/Form";
import "../style.scss";

export const ResetPassword = ({ setShowModal }) => {
  const { tokenResp, setTokenResp } = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  const emailRegister = register("email", {
    required: "Email обязателен",
  });
  const passwordRegister = register("password", {
    required: tokenResp ? "Пароль обязателен" : false,
    pattern,
  });

  useEffect(() => {
    setShowModal(true);
  }, [setShowModal]);

  const sendData = async (data) => {
    console.log({ data });

    if (!tokenResp) {
      try {
        const res = await authApi.resetPass(data);
        console.log({ res });
        setTokenResp(true);
      } catch (error) {
        console.log({ error });
        alert("Что-то пошло не так");
      }
    } else {
      console.log({ data });

      try {
        const res = await authApi.changePass(data.token, {
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
    // try {
    //   await authApi.resetPass({ ...data });
    // } catch (error) {
    //   alert("Указан неверный адресс почты");
    // }
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
          <input
            type={"password"}
            {...passwordRegister}
            placeholder="Пароль"
            className="auth__input"
            disabled={!tokenResp}
          />
          {errors?.password && (
            <span className="auth__warning">{errors.password?.message}</span>
          )}
          <input
            type={"text"}
            {...register("token", {
              required: tokenResp ? "Токен обязателен" : false,
            })}
            placeholder="Токен"
            className="auth__input"
            disabled={!tokenResp}
          />
          <span className="auth__info" onClick={() => navigate(-1)}>
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

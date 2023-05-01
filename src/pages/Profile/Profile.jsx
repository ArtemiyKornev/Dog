import "./index.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { api } from "../../utils/api";
import { useForm } from "react-hook-form";
import { Form } from "../../components/Form/Form";
import { BaseButton } from "../../components/BaseButton/BaseButon";
import { openNotification } from "../../components/Notification/Notification";

export const UserProfile = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({ mode: "onSubmit" });

  const sendUserData = async (data) => {
    try {
      const updUser = await api.updateUserInfo({
        name: data.name,
        about: data.about,
      });
      setCurrentUser({ ...updUser });
      openNotification("success", "Успешно", "Данные усешно изменены");
    } catch (error) {
      openNotification("error", "error", "Не удалось изменить данные");
    }
  };
  const sendAvatar = async ({ avatar }) => {
    try {
      const updAvatar = await api.updateUserAvatar({ avatar: avatar });
      setCurrentUser({ ...updAvatar });
      openNotification("success", "Успешно", "Аватар усешно изменен");
    } catch (error) {
      openNotification("error", "error", "Не удалось изменить аватар");
    }
  };

  const required = {
    required: {
      value: true,
    },
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <div className="back" onClick={() => navigate(-1)}>
        {"<"}Назад
      </div>
      <h1>Мои данные</h1>
      <h2>Изменить данные</h2>
      <>
        <Form submitForm={handleSubmit(sendUserData)}>
          <div className="profile__user ">
            <input
              {...register("name", required)}
              className="profile__input"
              defaultValue={currentUser.name}
              type="text"
              placeholder="Имя"
            ></input>
            <input
              {...register("about", required)}
              className="profile__input"
              defaultValue={currentUser.about}
              placeholder="Описание"
            ></input>
            <input
              {...register("email")}
              className="profile__input"
              defaultValue={currentUser?.email}
              disabled
              placeholder="Email"
            ></input>
            <input
              {...register("id")}
              className="profile__input"
              defaultValue={currentUser?._id}
              disabled
              placeholder="Id"
            ></input>
            <BaseButton type="submit" color={"yellow"}>
              Сохранить
            </BaseButton>
          </div>
        </Form>
        <h2>Изменить аватар</h2>
        <div className="profile__avatar">
          <Form submitForm={handleSubmit(sendAvatar)}>
            <div className="profile__user-avatar">
              <img
                className="profile__avatar-img"
                src={currentUser.avatar}
              ></img>
              <input
                className="profile__input"
                {...register("avatar")}
                defaultValue={currentUser?.avatar}
                placeholder="avatar"
              ></input>
              <BaseButton type="submit" color={"yellow"}>
                Сохранить
              </BaseButton>
              <BaseButton onClick={handleLogout}>
                {" "}
                Выйти из аккаунта{" "}
              </BaseButton>
            </div>
          </Form>
        </div>
      </>
    </div>
  );
};

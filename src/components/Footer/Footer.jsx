import { Logo } from "../Logo/Logo";
import "./index.css";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Link } from "react-router-dom";

export const Footer = () => {
  const up = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="footer">
      <div className="container">
        <div className="footer__wrapper">
          <div className="footer__col">
            <Logo className="footer__logo" />
            <p className="footer__copyright">© «Интернет-магазин DogFood.ru»</p>
          </div>
          <div className="footer__col">
            <nav className="menu-bottom">
              <a href="/" className="menu-bottom__item">
                Каталог
              </a>
              <a href="/" className="menu-bottom__item">
                Акции
              </a>
              <a href="/" className="menu-bottom__item">
                Новости
              </a>
              <a href="/" className="menu-bottom__item">
                Отзывы
              </a>
            </nav>
          </div>
          <div className="footer__col">
            <nav className="menu-bottom">
              <a href="/" className="menu-bottom__item">
                Оплата и доставка
              </a>
              <Link to={"/faq"} className="menu-bottom__item">
                <span onClick={() => up()}>Часто спрашивают</span>
              </Link>
              <a href="/" className="menu-bottom__item">
                Обратная связь
              </a>
              <a href="/" className="menu-bottom__item">
                Контакты
              </a>
            </nav>
          </div>
          <div className="footer__col">
            <nav className="menu-bottom">
              <a href="/" className="menu-bottom__item">
                Мы на связи
              </a>
              <a href="tel:7999000000" className="menu-bottom__item">
                +7 (999) 00-00-00
              </a>
              <a href="mailto:dogfood@gmail.com" className="menu-bottom__item">
                dogfood@gmail.com
              </a>
              <a href="" className="social__logo">
                <TelegramIcon /> <WhatsAppIcon /> <InstagramIcon />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

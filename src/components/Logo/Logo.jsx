import logoSrc from "./logo.svg";
import "./index.css";
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to="/">
      <img src={logoSrc} alt="лого компании" className="logo-pic" />
    </Link>
  );
};

import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found">
      <div>Простите, страница не найдена.</div>
      <div>
        <SentimentVeryDissatisfiedIcon />
      </div>
      <button className="btn btn_type_primary" onClick={() => navigate("/")}>
        На главную
      </button>
    </div>
  );
};

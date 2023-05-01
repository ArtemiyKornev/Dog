import { useCallback, useEffect, useState } from "react";
import { ReactComponent as Star } from "./star.svg";
import cn from "classnames";
import s from "./index.module.css";

export const Rating = ({ rate, setRate, isEditable = false }) => {
  const emptyFragments = new Array(5).fill(<></>);
  const [ratingArr, setRatingArr] = useState(emptyFragments);

  const changeDisplay = (rate) => {
    if (!isEditable) return;
    constructRating(rate);
  };

  const changeRating = (r) => {
    if (!isEditable) return;
    setRate(r);
  };

  const constructRating = useCallback(
    (rating) => {
      const updatedArray = ratingArr.map((ratingEl, index) => (
        <Star
          className={cn(s.star, {
            [s.filled]: index < rating,
            [s.editable]: isEditable,
          })}
          onMouseEnter={() => changeDisplay(index + 1)}
          onMouseLeave={() => changeDisplay(rate)}
          onClick={() => changeRating(index + 1)}
        />
      ));
      setRatingArr(updatedArray);
    },
    [isEditable, rate]
  );

  useEffect(() => {
    constructRating(rate);
  }, [constructRating]);

  return (
    <div>
      {ratingArr.map((e, i) => (
        <span key={i}>{e}</span>
      ))}
    </div>
  );
};

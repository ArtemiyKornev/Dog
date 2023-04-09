import cn from "classnames";
import "./index.css";

export const Modal = ({ activeModal, children, setShowModal }) => {
  return (
    <>
      <div
        className={cn("modal", { ["active"]: activeModal })}
        onClick={() => setShowModal(false)}
      >
        <div
          className={cn("modal_content", { ["active"]: activeModal })}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>
  );
};

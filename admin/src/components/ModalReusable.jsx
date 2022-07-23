import React from "react";

import { useSelector } from "react-redux";

const Modal = ({ toggleModal, title, children }) => {
  const modalContent = useSelector((store) => store.modalReducer.modalContent);
  return (
    <div className="modal-container">
      <div className="modal-content">
        <div className="modal-title">
          <h2>
            {title} {modalContent}
          </h2>
          <i onClick={toggleModal} className="fa-solid fa-xmark"></i>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;

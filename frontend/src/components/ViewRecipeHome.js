import React from "react";
import style from "./RecipeTile.module.css";

const ViewRecipeHome = ({ name, ingredients, procedure, cancel, image }) => {

  const onCancelEdit = (e) => {
    e.preventDefault();
    cancel(false);
  };
  
  return (
    <div>
      <input className={style.modalState} id="modal-1" type="checkbox" />
      <div className={style.modal}>
        <label className={style.modalBg} for="modal-1"></label>
        <div className={style.modalInner}>
          <label
            className={style.modalClose}
            for="modal-1"
            onClick={onCancelEdit}
          ></label>
          <h2 className={style.header}>{name}</h2>
          <p>
            <img src={image} alt="adobo" />
          </p>
          <h2 className={style.subHeader}> Ingredients </h2>
          <br />
          <p> {ingredients}</p>
          <br />
          <h2 className={style.subHeader}> Instructions </h2>
          <br />
          <p> {procedure}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewRecipeHome;

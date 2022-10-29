import React from "react";
import style from "./RecipeTileProfile.module.css";

const ViewRecipe = ({ name, ingredients, procedure, cancel }) => {
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
          <h2>{name}</h2>
          <p>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chicken_Adobo_over_rice.jpg/440px-Chicken_Adobo_over_rice.jpg"
              alt="adobo"
            />
          </p>
          <h2> Ingredients </h2>
          {ingredients}
          <br />
          <h2> Instructions </h2>
          <br />
          {procedure}
        </div>
      </div>
    </div>
  );
};

export default ViewRecipe;

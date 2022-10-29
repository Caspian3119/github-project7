import React from "react";
import style from "./RecipeTileProfile.module.css";
import edit from "../FE/images/edit.png";
import deletebtn from "../FE/images/delete.png";
import axios from "axios";

const RecipeTileProfile = ({
  name,
  description,
  id,
  editClick,
  viewRecipe,
}) => {
  return (
    <div className={style.body}>
      <div className={style.card}>
        <div className={style.cardBody}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chicken_Adobo_over_rice.jpg/440px-Chicken_Adobo_over_rice.jpg"
            alt="food"
            className={style.cardImage}
          ></img>
          <h2 className={style.cardTitle}>{name}</h2>
          <hr className={style.cardline} />
          <p className={style.cardDesc}>{description}</p>
        </div>
        <label
          className={style.cardBtn}
          for="modal-1"
          onClick={() => viewRecipe(id)}
        >
          View Full Receipe
        </label>
        <div className={style.socials}>
          <label for="modal-edit" onClick={() => editClick(id)}>
            <img src={edit} alt="edit" />
          </label>
          <button
            onClick={() => {
              if (
                window.confirm("Are you sure you want to delete this recipe?")
              ) {
                axios
                  .delete(`http://localhost:8080/api/v1/recipes/${id}`)
                  .then((response) => {
                    console.log(response);
                    window.location.reload();
                  });
              }
            }}
          >
            <img src={deletebtn} alt="delete" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeTileProfile;

import React, { useState, useEffect } from "react";
import style from "./NewRecipe.module.css";
import axios from "axios"

const NewRecipe = ({props, accountId}) => {
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: "",
    procedure: "",
    created_by: accountId,
  });

  const onChange = (e) => {
    const inputName = e.target.name;

    switch (inputName) {
      case "recipeName":
        setRecipe({
          ...recipe,
          name: e.target.value,
        });
        break;

      case "description":
        setRecipe({
          ...recipe,
          description: e.target.value,
        });
        break;

      case "ingredients":
        setRecipe({
          ...recipe,
          ingredients: e.target.value,
        });
        break;

      case "procedure":
        setRecipe({
          ...recipe,
          procedure: e.target.value,
        });
        break;

      default:
        break;
    }
  };

  const onSubmitRecipe = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/v1/recipes", recipe).then((response) => {
      props.submit(recipe);
    })
  };

  const cancelRecipe = (e) => {
    e.preventDefault();
    props.hideNewRecipeForm(false);
  };

  return (
    <div>
      <form className={style.form}>
        <input
          name="recipeName"
          type="text"
          placeholder="Recipe Name:"
          className={style.input}
          onChange={onChange}
        />
        <br />
        <input
          name="description"
          type="text"
          placeholder="Description:"
          className={style.input}
          onChange={onChange}
        />
        <br />
        <input
          name="ingredients"
          type="text"
          placeholder="Ingredients:"
          className={style.input}
          onChange={onChange}
        />
        <br />
        <input
          name="procedure"
          type="text"
          onChange={onChange}
          className={style.input}
          placeholder="Procedure:"
        />
        <br />
        <button className={style.button} onClick={onSubmitRecipe}>
          Submit
        </button>
        <button className={style.button} onClick={cancelRecipe}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default NewRecipe;

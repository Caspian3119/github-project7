import React, { useState } from "react";
import axios from "axios";
import style from "./RecipeTileProfile.module.css";

const EditForm = ({
  _id,
  submit,
  name,
  ingredients,
  procedure,
  desc,
  cancel,
}) => {
  const [item, setItem] = useState({
    // id: _id,
    name: name,
    ingredients: ingredients,
    procedure: procedure,
    desc: desc,
  });

  const [valueName, setValueName] = useState(name);
  const [valueIngredients, setValueIngredients] = useState(ingredients);
  const [valueProcedure, setValueProcedure] = useState(procedure);
  const [valueDesc, setValueDesc] = useState(desc);

  const onChange = (e) => {
    const inputName = e.target.name;

    switch (inputName) {
      case "name":
        setValueName(e.target.value);
        setItem({
          ...item,
          name: e.target.value,
        });
        break;

      case "ingredients":
        setValueIngredients(e.target.value);
        setItem({
          ...item,
          ingredients: e.target.value,
        });
        break;

      case "procedure":
        setValueProcedure(e.target.value);
        setItem({
          ...item,
          procedure: e.target.value,
        });
        break;

      case "desc":
        setValueDesc(e.target.value);
        setItem({
          ...item,
          desc: e.target.value,
        });
        break;

      default:
        break;
    }
  };

  const onEditItem = (e) => {
    e.preventDefault();

    if (window.confirm("Recipe has been updated!")) {
      axios
        .put(`http://localhost:8080/api/v1/recipes/edit-recipe/${_id}`, item)
        .then((response) => {
          submit(item);
          window.location.reload();
        });
    }
  };

  const onCancelEdit = (e) => {
    e.preventDefault();
    cancel(false);
  };

  return (
    <>
      <input className={style.modalState} id="modal-edit" type="checkbox" />
      <div className={style.modal}>
        <label className={style.modalBg} htmlFor="modal-edit"></label>
        <div className={style.modalInner}>
          <h2>Edit Recipe</h2>
          <form>
            <label>Recipe Name:</label> <br />
            <br />
            <input
              type="text"
              name="name"
              value={valueName}
              onChange={onChange}
            />
            <br />
            <br />
            <label>Recipe Description:</label> <br />
            <br />
            <input
              type="text"
              name="desc"
              value={valueDesc}
              onChange={onChange}
            />
            <br />
            <br />
            <label>Recipe Image:</label> <br />
            <br />
            <input type="text" name="rimage" /> <br />
            <br />
            <label>Ingredients:</label> <br />
            <br />
            <input
              type="text"
              name="ingredients"
              value={valueIngredients}
              onChange={onChange}
            />
            <br />
            <br />
            <label>Procedure:</label> <br />
            <br />
            <input
              type="text"
              name="procedure"
              value={valueProcedure}
              onChange={onChange}
            />
            <br />
            <br />
            <button onClick={onEditItem}> Update Recipe</button>
            <button onClick={onCancelEdit}>Cancel</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditForm;

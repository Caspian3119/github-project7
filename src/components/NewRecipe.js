import React, { useState } from "react";
import style from "./NewRecipe.module.css";
import axios from "axios";
import Modal from 'react-modal';
import error from "../FE/images/Error.png"


const NewRecipe = ({ accountId, hideNewRecipeForm }) => {
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: "",
    procedure: "",
    created_by: accountId,
  });

  const [detailsModal, setDetailsModal] = useState(false);
  const [specialCharactersModal, setSpecialCharactersModal] = useState(false);

  const openDetailsModalMessage = () => {
    setDetailsModal(true);
  }

  const closeDetailsModalMessage = () => {
    setDetailsModal(false);
  }

  const openSpecialCharactersModalMessage = () => {
    setSpecialCharactersModal(true);
  }

  const closeSpecialCharactersModalMessage = () => {
    setSpecialCharactersModal(false);
  }
  
  const customStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.75)'
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: "1px solid red",
      height: "40vh", 
      width: "40vw"
    },
  };






  const makeExample = "@#$%^&*_+-=[]{}|<>"

  const checkInput = /!!/;

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
    if (recipe.name === "" ||recipe.description === "" ||recipe.ingredients === "" ||recipe.procedure === "") {
      openDetailsModalMessage();
    } 
    else if (recipe.name.match(checkInput) ||recipe.description.match(checkInput) ||recipe.ingredients.match(checkInput) ||recipe.procedure.match(checkInput)) {
      openSpecialCharactersModalMessage();
    }
     else {
      if (window.confirm("Recipe Added!")) {
        axios
          .post(`https://project-7-back-end.herokuapp.com/api/v1/recipes/`, recipe)
          .then((response) => {
            window.location.reload();
          });
      }
    }
  };

  const cancelRecipe = (e) => {
    e.preventDefault();
    hideNewRecipeForm(false);
  };

  return (
    <div>
      <form className={style.form}>
        {/* <input */}
        <textarea
          className={style.textAreas1}
          name="recipeName"
          type="text"
          placeholder="Recipe Name:"
          // className={style.input}
          onChange={onChange}
        />
        <br />
        {/* <input */}
        <textarea
          className={style.textAreas2}
          name="description"
          type="text"
          placeholder="Description:"
          // {/* className={style.input} */}
          onChange={onChange}
        />
        <br />
        {/* <input */}
        <textarea
          className={style.textAreas2}
          name="ingredients"
          type="text"
          placeholder="Ingredients:"
          // {/* className={style.input} */}
          onChange={onChange}
        />
        <br />
        {/* <input */}
        <textarea
          className={style.textAreas3}
          name="procedure"
          type="text"
          onChange={onChange}
          // className={style.input}
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

      <Modal
        isOpen={detailsModal}
        onRequestClose={closeDetailsModalMessage}
        style={customStyles}
        ariaHideApp={false}
        className={style.modal}
      >
        <div>
          <div className={style.modalText}>
            <img src={error} alt="error" className={style.error} />
            <br></br>
            <h3> Empty fields </h3>
            <br></br>
            <p> Please make sure to complete all fields</p>
          </div>
          <div>
            <div>
              <button onClick={closeDetailsModalMessage} className={style.btnModal}>
                <p>Go Back</p>
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={specialCharactersModal}
        onRequestClose={closeSpecialCharactersModalMessage}
        style={customStyles}
        ariaHideApp={false}
      >
        <div>
          <div className={style.modalText}>
            <img src={error} alt="error" className={style.error} />
            <br></br>
            <h3> Special Characters </h3>
            <br></br>
            <p> Input should not have special characters!
            Example: {makeExample}</p>
          </div>
          <div>
            <div>
              <button onClick={closeDetailsModalMessage} className={style.btnModal}>
                <p>Go Back</p>
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NewRecipe;

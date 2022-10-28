import React from "react";
import style from "./ProfilePage.module.css";
import Nav from "./Nav";
import profileImage from "../FE/images/profile.png";
import { FcPlus } from "react-icons/fc";
import NewRecipe from "../components/NewRecipe";
import RecipeTileProfile from "../components/RecipeTileProfile";
import EditRecipeForm from "../components/EditRecipeForm";
import { useEffect, useState, useReducer } from "react";
import axios from "axios";

const initialState = {
  recipes: [],
  editForm: false,
  editRecipe: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE-EDIT-ITEM-FORM":
      return state.editForm
        ? { ...state, editForm: false }
        : { ...state, editForm: true };

    case "RECIPES": {
      return {
        ...state,
        recipes: action.payload,
      };
    }

    case "ADD-RECIPE-SUBMIT": {
      const recipe = {
        ...action.payload.newItem,
      };
      return { ...state, recipes: [...state.recipes, recipe] };
    }

    case "TOGGLE-EDIT-FORM": {
      const editForm = state.recipes.findIndex(
        (item) => item._id === action.payload.id
      );
      console.log(editForm);
      const itemEdit = state.recipes[editForm];
      console.log(itemEdit);
      return { ...state, editForm: true, editRecipe: itemEdit };
    }

    case "TOGGLE-RECIPE": {
      const recipe = state.recipes.findIndex(
        (item) => item._id === action.payload.id
      );
      const currentRecipe = state.recipes[recipe];
      return { ...state, viewRecipe: currentRecipe };
    }

    case "SAVE-EDIT-FORM": {
      const updatedRecipe = state.recipes.map((item) => {
        if (item._id === action.payload.editItem.id) {
          return action.payload.editItem;
        }
        return item;
      });
      console.log(updatedRecipe);
      return { ...state, recipes: updatedRecipe, editForm: false };
    }

    default:
      break;
  }
};

const ProfilePage = ({
  showAddRecipeForm,
  hideNewRecipeForm,
  newRecipe,
  addRecipe,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [accountId, setAccountId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/recipes").then((response) => {
      dispatch({
        type: "RECIPES",
        payload: response.data,
      });
    });
  }, []);

  useEffect(() => {
    const activeToken = localStorage.getItem("token");
    axios
      .post("http://localhost:8080/api/v1/accounts/active", {
        activeToken: activeToken,
      })
      .then((res) => {
        if (res.data.success) {
          //console.log(res.data.data);
          setAccountId(res.data._id);
          setUsername(res.data.username);
          setEmail(res.data.email);
          setPassword(res.data.password);
        } else {
          alert(res.data.message);
        }
      });
  }, []);

  const handleAddRecipe = (newItem) => {
    dispatch({ type: "ADD-RECIPE-SUBMIT", payload: { newItem } });
  };
  const handleEditClick = (id) => {
    dispatch({ type: "TOGGLE-EDIT-FORM", payload: { id } });
  };

  const handleViewRecipe = (id) => {
    dispatch({ type: "TOGGLE-RECIPE", payload: { id } });
  };

  const editCurrItem = (editItem) => {
    dispatch({ type: "SAVE-EDIT-FORM", payload: { editItem } });
  };

  const cancelEditItem = () => {
    dispatch({ type: "TOGGLE-EDIT-ITEM-FORM", payload: { editForm: false } });
  };

  const listItems = state.recipes.map((item, index) => (
    //data transformation
    <RecipeTileProfile
      key={index}
      id={item._id}
      name={item.name}
      procedure={item.procedure}
      ingredients={item.ingredients}
      editClick={handleEditClick}
      viewRecipe={handleViewRecipe}
      //{...state.viewRecipe}
    />
  ));

  return (
    <div>
      <Nav />
      <div className={style.header}>
        <img src={profileImage} alt="profile" className={style.profile} />
        <h1> Azealia's Recipes</h1>
        {newRecipe ? (
          <NewRecipe
            submit={handleAddRecipe}
            hideNewRecipeForm={hideNewRecipeForm}
            showAddRecipeForm={showAddRecipeForm}
          />
        ) : (
          <button className={style.button} onClick={showAddRecipeForm}>
            {" "}
            <FcPlus /> Publish New Receipe{" "}
          </button>
        )}
      </div>
      <hr />
      {listItems}
      {state.editForm ? (
        <EditRecipeForm
          submit={editCurrItem}
          cancel={cancelEditItem}
          {...state.editRecipe}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default ProfilePage;

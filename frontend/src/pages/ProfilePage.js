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
  //viewRecipe:[]
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

    case "DELETE-ITEM": {
      const updatedRecipe = state.recipes.filter((item) => {
        return item._id !== action.payload.id;
      });
      return { ...state, recipes: updatedRecipe };
    }
    case "LATEST-RECIPE": {
      const sortedRecipes = state.recipes.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });
      return { ...state, recipes: sortedRecipes };
    }

    default:
      break;
  }
};

const ProfilePage = ({
  showAddRecipeForm,
  hideNewRecipeForm,
  newRecipe,
  deleteRecipe,
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
          // console.log(res.data.data);
          setAccountId(res.data.data._id);
          setUsername(res.data.data.username);
          setEmail(res.data.data.email);
          setPassword(res.data.data.password);
        } else {
          alert(res.data.data.message);
        }
      });

    axios.get("http://localhost:8080/api/v1/recipes").then((response) => {
      dispatch({
        type: "RECIPES",
        payload: response.data,
      });
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/recipes").then((response) => {
      dispatch({
        type: "LATEST-RECIPE",
        payload: response.data,
      });
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
    console.log(id)
  };

  const editCurrItem = (editItem) => {
    dispatch({ type: "SAVE-EDIT-FORM", payload: { editItem } });
  };

  const cancelEditItem = () => {
    dispatch({ type: "TOGGLE-EDIT-ITEM-FORM", payload: { editForm: false } });
  };

  const deleteItem = (id) => {
    dispatch({ type: "DELETE-ITEM", payload: { id } });
  };

  const latestRecipe = (id) => {
    dispatch({ type: "LATEST-RECIPE", payload: { id } });
  };

 

  // SHOW RECIPE CREATED BY LOGGED IN USER //
  let userRecipe = state.recipes.filter((recipeItem) => {
    return recipeItem.created_by === accountId;
  });

 


  // USER RECIPES TO BE SHOWN IN CARD UI //
  const listItems =
    userRecipe.length === 0 ? (
      <p>No Posted Recipes</p>
    ) : (
      userRecipe.map((item, index) => (
        //data transformation
       
        <RecipeTileProfile
          key={index}
          id={item._id}
          name={item.name}
          procedure={item.procedure}
          ingredients={item.ingredients}
          description={item.description}
          editClick={handleEditClick}
          viewRecipe={handleViewRecipe}
          deleteItem={deleteItem}
          latestRecipe={latestRecipe}
          //{...state.viewRecipe}
        />
        ))
    );
  


  return (
    <div>
      <Nav />
      <div className={style.header}>
        <img src={profileImage} alt="profile" className={style.profile} />
        <h1> {username}'s Recipes</h1>
        {newRecipe ? (
          <NewRecipe
            submit={handleAddRecipe}
            hideNewRecipeForm={hideNewRecipeForm}
            showAddRecipeForm={showAddRecipeForm}
            accountId={accountId}
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
      <button className={style.button} onClick={deleteRecipe}></button>
    </div>
  );
};

export default ProfilePage;

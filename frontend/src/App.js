import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";

import React, {useState} from "react";
import "./styles.css";

import Nav from './pages/Nav';
import Home from './pages/HomePage';
import RecipeTile from './components/RecipeTile';
import Profile from './pages/ProfilePage';
import Login from './frontend/Login';
import Signup from './frontend/Signup';
import { AuthProvider } from './context/AuthContext';
import PrivateRoutes from './privateRoutes/PrivateRoutes';

function App() {
  
    const [editRecipeDetail, setEditRecipeDetail] = useState([]);
    const [newRecipe, showNewForm] = useState(false);
    const [editRecipe, showEditForm] = useState(false);
    const [category, setCategory] = useState("");
    const [recipes, setRecipes] = useState([
      {
        id: uuidv4(),
        recipeName: "Chicken Adobo",
        description: "The dish is normally cooked with pork or chicken and sometimes with only vegetables like kangkong (water spinach) or sitaw (green beans)",
        ingredients: "<ul> <li> 2 lbs. Chicken cut into serving pieces </li>  <li> 1 piece Knorr Chicken Cube</li> <li> 1 head garlic crushed </li> <li> 1 piece onion chopped </li> <li> 1 tablespoon whole peppercorn </li> <li> ½ cup soy sauce </li> <li> 5 tablespoons white vinegar </li> <li> 1 ½ tablespoons dark brown sugar </li> <li> 2 cups water</li> <li> 3 tablespoons cooking oil</li>  <li> Salt to taste</li </ul>",
        procedure: "gisa",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chicken_Adobo_over_rice.jpg/440px-Chicken_Adobo_over_rice.jpg"
      },
      {
        id: uuidv4(),
        recipeName: "Chicken Adobo",
        description: "The dish is normally cooked with pork or chicken and sometimes with only vegetables like kangkong (water spinach) or sitaw (green beans)",
        ingredients: "<ul> <li> 2 lbs. Chicken cut into serving pieces </li>  <li> 1 piece Knorr Chicken Cube</li> <li> 1 head garlic crushed </li> <li> 1 piece onion chopped </li> <li> 1 tablespoon whole peppercorn </li> <li> ½ cup soy sauce </li> <li> 5 tablespoons white vinegar </li> <li> 1 ½ tablespoons dark brown sugar </li> <li> 2 cups water</li> <li> 3 tablespoons cooking oil</li>  <li> Salt to taste</li </ul>",
        procedure: "gisa",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chicken_Adobo_over_rice.jpg/440px-Chicken_Adobo_over_rice.jpg"
      },
      {
        id: uuidv4(),
        recipeName: "Chicken Adobo",
        description: "The dish is normally cooked with pork or chicken and sometimes with only vegetables like kangkong (water spinach) or sitaw (green beans)",
        ingredients: "<ul> <li> 2 lbs. Chicken cut into serving pieces </li>  <li> 1 piece Knorr Chicken Cube</li> <li> 1 head garlic crushed </li> <li> 1 piece onion chopped </li> <li> 1 tablespoon whole peppercorn </li> <li> ½ cup soy sauce </li> <li> 5 tablespoons white vinegar </li> <li> 1 ½ tablespoons dark brown sugar </li> <li> 2 cups water</li> <li> 3 tablespoons cooking oil</li>  <li> Salt to taste</li </ul>",
        procedure: "gisa",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chicken_Adobo_over_rice.jpg/440px-Chicken_Adobo_over_rice.jpg"
      },
      {
        id: uuidv4(),
        recipeName: "Chicken Adobo",
        description: "The dish is normally cooked with pork or chicken and sometimes with only vegetables like kangkong (water spinach) or sitaw (green beans)",
        ingredients: "<ul> <li> 2 lbs. Chicken cut into serving pieces </li>  <li> 1 piece Knorr Chicken Cube</li> <li> 1 head garlic crushed </li> <li> 1 piece onion chopped </li> <li> 1 tablespoon whole peppercorn </li> <li> ½ cup soy sauce </li> <li> 5 tablespoons white vinegar </li> <li> 1 ½ tablespoons dark brown sugar </li> <li> 2 cups water</li> <li> 3 tablespoons cooking oil</li>  <li> Salt to taste</li </ul>",
        procedure: "gisa",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chicken_Adobo_over_rice.jpg/440px-Chicken_Adobo_over_rice.jpg"
      },
    ]);
  
    let filteredRecipes =
      category === ""
        ? recipes
        : recipes.filter((recipe) => {
            return recipe.category === category;
          });
  
    const showAddRecipeForm = () => {
      newRecipe ? showNewForm(false) : showNewForm(true);
    };
  
    const showEditRecipeForm = (status, id) => {
      //show edit form
      editRecipe ? showEditForm(false) : showEditForm(status);
  
      const indexOfRecipe = recipes.findIndex((recipe) => recipe.id === id);
      const listRecipes = [...recipes];
      setEditRecipeDetail(...listRecipes.splice(indexOfRecipe, 1));
    };
  
    const hideNewRecipeForm = (status) => {
      editRecipe ? showNewForm(status) : showNewForm(status);
    };
    const hideEditRecipeForm = (status) => {
      editRecipe ? showEditForm(status) : showEditForm(status);
    };
  
    const addRecipe = (newRecipe) => {
      const recipe = {
        id: uuidv4(),
        ...newRecipe
      };
      const newRecipes = [...recipes, recipe];
      setRecipes(newRecipes);
      showNewForm(false);
    };
  
    const saveChanges = (i) => {
      const indexOfRecipe = recipes.findIndex((recipe) => recipe.id === i.id);
      const recipesCopy = [...recipes];
      recipesCopy.splice(indexOfRecipe, 1, i);
      setRecipes(recipesCopy);
      showEditForm(false);
    };
  
    const handleDeleteClick = (id) => {
      //filter
      const newRecipes = recipes.filter((recipe) => recipe.id !== id);
      setRecipes(newRecipes);
    };
  
    const listRecipes =
      filteredRecipes.length === 0 ? (
        <p>No recipe available.</p>
      ) : (
        filteredRecipes.map((recipe, index) => (
          <RecipeTile
            key={index}
            id={recipe.id}
            name={recipe.recipeName}
            description={recipe.description}
            ingredients={recipe.ingredients}
            procedure={recipe.procedure}
            image={recipe.image}
            deleteClick={handleDeleteClick}
            showEditRecipeForm={showEditRecipeForm}
            editRecipe={editRecipe}
          />
        ))
      );
    return (
        <div className="App">
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/" element={<PrivateRoutes />} > 
                        <Route exact path="/" element={<Home listRecipes={listRecipes}/>}/>
                        <Route 
                            path="profile" 
                            element={<Profile 
                            showAddRecipeForm={showAddRecipeForm}
                            hideNewRecipeForm={hideNewRecipeForm}
                            newRecipe={newRecipe}
                            addRecipe={addRecipe}
                        />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;
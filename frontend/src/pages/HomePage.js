
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './homePage.module.css';
import Nav from './Nav';
import RecipeTile from '../components/RecipeTile';


const HomePage = () => {
   const [recipes, setRecipes] = useState([]);
   const [search, setSearch] = useState("");
    const [filteredRecipes, setFilteredRecipes] = useState([]);



    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/recipes')
            .then(res => setRecipes(res.data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        setFilteredRecipes(
            recipes.filter(recipe => {
                return recipe.name.toLowerCase().includes(search.toLowerCase());
            })
        );
    }
    , [search, recipes]);
 

    const sortedRecipes = filteredRecipes.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
    }); 

    const updateSearch = (e) => {
        setSearch(e.target.value);
    }

    return (
        <div className={style.homePage}>
            <Nav />
            <div className={style.search}>
                <form className={style.searchForm}>
                    <input className={style.search} type="text" value={search} onChange={updateSearch} />
                    <button type="submit">Search</button>
                </form>
            </div>
            <div className={style.body}>
                {sortedRecipes.map(recipe => (
                    <RecipeTile 
                    key={recipe._id} 
                    recipe={recipe}
                    id={recipe._id}
                    name={recipe.name}
                    description={recipe.description}
                    ingredients={recipe.ingredients}
                    procedure={recipe.procedure}
                    image={recipe.image} />
                ))}
            </div>
        </div>
    )
}

export default HomePage;
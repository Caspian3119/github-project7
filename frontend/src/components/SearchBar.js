//search specific recipe by name
//inside axios call, add the following
//.then(res => this.setState({ recipes: res.data }))
//.catch(err => console.log(err));
//use useEffect to call the function


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import style from './SearchBar.module.css';

const SearchBar = () => {
    const [search, setSearch] = useState('');
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/recipes')
            .then(res => setRecipes(res.data))
            .catch(err => console.log(err));
    }, []);

    const updateSearch = (e) => {
        setSearch(e.target.value);
    }

    const getSearch = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:8080/api/v1/recipes?search=${search}`)
            .then(res => setRecipes(res.data))
            .catch(err => console.log(err));
    }

    return(
        <div className={style.searchBar}>
            <form className={style.searchForm}>
                <input className={style.searchBar} type="text" value={search} onChange={updateSearch} />
                <button  onClick={getSearch} className={style.searchButton} type="submit">Search</button>
            </form>
            {/* {recipes.map(recipe => (
                <div key={recipe._id} className={style.recipe}>
                    <Link to={`/recipes/${recipe._id}`}>
                        <h1>{recipe.name}</h1>
                    </Link>
                    <p>{recipe.description}</p>
                    <img src={recipe.image} alt={recipe.name} />
                </div>
            ))} */}
        </div>
    )
}

export default SearchBar;
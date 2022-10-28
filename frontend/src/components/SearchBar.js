

import React, { useState } from "react";
import axios from "axios";

const SearchBar = () => {
    const [search, setSearch] = useState("");
    const [recipes, setRecipes] = useState([]);
    
    const handleChange = (event) => {
        setSearch(event.target.value);
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        axios
        .get(`http://localhost:8080/api/v1/recipes/search?name=${search}`)
        .then((response) => {
            setRecipes(response.data);
        });
    };
    
    return (
        <div>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Search for recipes"
            value={search}
            onChange={handleChange}
            />
            <button type="submit">Search</button>
        </form>
        {recipes.map((item) => {
            return (
            <div key={item._id}>
                <p>{item.name}</p>
                <p>{item.ingredients}</p>
                <p>{item.procedure}</p>
            </div>
            );
        })}
        </div>
    );
    }

    export default SearchBar;
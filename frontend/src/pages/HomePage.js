
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './homePage.module.css';
import Nav from './Nav';
import RecipeTile from '../components/RecipeTile';

///images///

import latest from "../FE/images/icons/latest.png"
import friends from "../FE/images/icons/friends.png"
import groups from "../FE/images/icons/groups.png"
import trending from "../FE/images/icons/trending.png"
import groupsPage from "../FE/images/icons/GroupsIcon.png"
import hashtags from "../FE/images/icons/hashtags.png"
import KareKare from "../FE/images/icons/Kare-kare-tile.png"
import menudo from "../FE/images/icons/MenudoTile.png"
import pancit from "../FE/images/icons/pancitTile.png"
import Sinigang from "../FE/images/icons/sinigangTile.png"
import sopas from "../FE/images/icons/sopasTile.png"

///Stories
import create from "../FE/images/stories/create.png"
import storyA from "../FE/images/stories/story.png"
import storyB from "../FE/images/stories/story2.png"
import storyC from "../FE/images/stories/story3.png"
import storyD from "../FE/images/stories/story4.png"
import storyE from "../FE/images/stories/story5.png"
import storyF from "../FE/images/stories/story6.png"

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
 
    return(
<div>
    <Nav />
<div className={style.container}>
  <div className= {style.leftSide}>
    <div className ={style.NavHead}>Profile Activity</div>

    <div className= {style.sideWrapper}>
      <div className= {style.sideMenu}>
        <a href="#" className={style.top}>
            <img src={latest} alt="latest" className={style.icon}/>
            Latest Recipes</a>
        <a href="#" className={style.top}>
            <img src={friends} alt="friends" className={style.icon}/>
            Friends </a>
        <a href="#" className={style.top}>
            <img src={groups} alt="groups" className={style.icon}/>
            Groups </a>
        <a href="#" className={style.top}>
            <img src={trending} alt="trending" className={style.icon}/>
            Trending </a>
      </div>
    </div>  
    <div className= {style.sideWrapper}>
      <div className= {style.sideTitle}>
      <img src={groupsPage} alt="groupsPage" className={style.iconPage}/>
            GROUPS</div>
      <div className= {style.sideMenu}>
        <a href="#"> 
        <img src={hashtags} alt="hashtags" className={style.icon}/>
        Panlasang Pinoy (Rizal Chapter) </a>
        <a href="#">
        <img src={hashtags} alt="hashtags" className={style.icon}/>
        Master Chef Kainta </a>
        <a href="#">
        <img src={hashtags} alt="hashtags" className={style.icon}/>
        Solen V.S Erwan </a>
        <a href="#">
        <img src={hashtags} alt="hashtags" className={style.icon}/>
        Cheap meals </a>
        <a href="#">
        <img src={hashtags} alt="hashtags" className={style.icon}/>
        Canton Hacks </a>
        <a href="#">
        <img src={hashtags} alt="hashtags" className={style.icon}/>
        Keto Pinas </a>
        <a href="#"> see more...</a>
      </div>
    </div> 
      <div className= {style.sideWrapper}>
      <div className= {style.sideTitle}>Suggested Groups:</div>
      <div className= {style.sideMenu}>
        <a href="#"><img src={hashtags} alt="hashtags" className={style.icon}/>
        Vegan MNLA</a>
        <a href="#"> <img src={hashtags} alt="hashtags" className={style.icon}/>
        Obando Food Crawl</a>
        <a href="#"> <img src={hashtags} alt="hashtags" className={style.icon}/>
        What's your ulam pare</a>
        <a href="#"> <img src={hashtags} alt="hashtags" className={style.icon}/>
        Battle of Adobos</a>
        <a href="#"> see more...</a>
      </div>
    </div> 
    <div className= {style.sideWrapper}>
      <div className= {style.sideTitle}>Saved Recipes</div>
      <div className= {style.sideMenu}>
        <a href="#"> 
        <img src={KareKare} alt="KareKare" className={style.foodIcon}/>
        Kare-Kare sa kalabasa </a>
        <a href="#">
        <img src={menudo} alt="menudo" className={style.foodIcon}/>
        Menudong Kambing </a>
        <a href="#">
        <img src={pancit} alt="pancit" className={style.foodIcon}/>
        Pancit Bato </a> 
        <a href="#">
        <img src={Sinigang} alt="Sinigang" className={style.foodIcon}/>
        Sinigang </a>
        <a href="#">
        <img src={sopas} alt="sopas" className={style.foodIcon}/>
        Vegan Sopas </a>
        <a href="#"> see more... </a>
      </div>
    </div> 
    
  </div>
  <div className={style.main}>
  <div className={style.search}>
                <form className={style.searchForm}>
                    <input className={style.search} type="text" value={search} onChange={updateSearch} />
                    <button type="submit">Search</button>
                </form>
            </div>
  <div className={style.gallery}>
  <a> <img src={create} alt="create" className={style.stories} /></a>
  <a> <img src={storyA} alt="create" className={style.stories} /></a>
  <a> <img src={storyB} alt="storyA" className={style.stories} /></a>
  <a> <img src={storyC} alt="storyA" className={style.stories} /></a>
  <a> <img src={storyD} alt="storyA" className={style.stories} /></a>
  <a> <img src={storyE} alt="storyA" className={style.stories} /></a>
  <a> <img src={storyF} alt="storyA" className={style.stories} /></a>
</div>
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
</div>
)
}


export default HomePage
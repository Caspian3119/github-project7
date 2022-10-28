import React from 'react'
import style from './homePage.module.css'
import like from '../FE/images/likebtn.png'
import share from '../FE/images/share.png'
import save from '../FE/images/save.png'
import Nav from './Nav';

const HomePage = ({ listRecipes }) => {
    return(
    <>
    <Nav />
    <div className={style.body}>
        {listRecipes}
    </div>
    </>
  
  )
}
export default HomePage

import React from 'react'
import style from './RecipeTileProfile.module.css'
import edit from '../FE/images/edit.png'
import deletebtn from '../FE/images/delete.png'

const RecipeTileProfile = ({name,ingredients,procedure, id, editClick, viewRecipe}) => {
  return (
    <div className={style.body}>
    <div className={style.card}>
        <div className={style.cardBody}>
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chicken_Adobo_over_rice.jpg/440px-Chicken_Adobo_over_rice.jpg'
                 alt='food' className={style.cardImage}></img>
            <h2 className={style.cardTitle}>
                {name}
            </h2>
            <hr className={style.cardline}/>
            <p className={style.cardDesc}>
            The dish is normally cooked with pork or chicken and sometimes with only vegetables
                like kangkong (water spinach) or sitaw (green beans).
            </p>
        </div>
            <label className={style.cardBtn} for="modal-1" onClick={() => viewRecipe(id)} >View Full Receipe</label>
        <div className={style.socials}>
            <label for="modal-edit" onClick={() => editClick(id)} ><img src={edit} alt="edit" /></label>
            <button><img src={deletebtn} alt="delete" /></button>
        </div>
    </div>
    <input className={style.modalState} id="modal-1" type="checkbox"/>
          <div className={style.modal}>
            <label className={style.modalBg} for="modal-1"></label>
            <div className={style.modalInner}>
                <label className={style.modalClose} for="modal-1"></label>
                <h2>Chicken Adobo</h2>
                <p><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chicken_Adobo_over_rice.jpg/440px-Chicken_Adobo_over_rice.jpg'
                 alt="adobo" /></p>
                <h2> Ingredients </h2>
                {ingredients}
                <br/>
                <h2> Instructions </h2>
                <br/>
                {procedure}
           </div>
         </div>
  </div>
  )
}

export default RecipeTileProfile

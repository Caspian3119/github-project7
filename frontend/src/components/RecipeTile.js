import React from "react";
import style from './RecipeTile.module.css'
import like from '../FE/images/likebtn.png'
import share from '../FE/images/share.png'
import save from '../FE/images/save.png'


const RecipeTile = ({
  id,
  name,
  description,
  ingredients,
  procedure,
  image,
}) => {
  return (
<div className={style.body}>
        <div className={style.card}>
            <div className={style.cardBody}>
                <img src={image}
                     alt='food'
                     className={style.cardImage}>
                </img>
                <h2 className={style.cardTitle}>
                    {name}
                </h2>
                <hr className={style.cardline}/>
                <p className={style.cardDesc}>
                {description}
                </p>
            </div>
                <label className={style.cardBtn} for="modal-1"> View Full Receipe</label>
            <div className={style.socials}>
                <button className={style.Btn}><img src={like} alt="like" /></button>
                <button className={style.Btn}><img src={share} alt="share" /></button>
                <button className={style.Btn}><img src={save} alt="save" /></button>
            </div>
        </div>
        <input className={style.modalState} id="modal-1" type="checkbox"/>
          <div className={style.modal}>
            <label className={style.modalBg} for="modal-1"></label>
            <div className={style.modalInner}>
                <label className={style.modalClose} for="modal-1"></label>
                <h2 className={style.header}>{name}</h2>
                <p><img src={image}
                 alt="adobo" />
                </p>
                <h2 className={style.subHeader}> Ingredients </h2>
                <br/>
                <p> {ingredients}</p>
                <br/>
                <h2 className={style.subHeader}> Instructions </h2>
                <br/>
                <p> {procedure}</p>
           </div>
         </div>
      </div>
  );
};

export default RecipeTile;

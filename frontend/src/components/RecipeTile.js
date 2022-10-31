import React from "react";
import style from "./RecipeTile.module.css";
import like from "../FE/images/likebtn.png";
import share from "../FE/images/share.png";
import save from "../FE/images/save.png";
import { IKImage, IKVideo, IKContext, IKUpload } from 'imagekitio-react';

const RecipeTile = ({ id, image, viewRecipe, name, description }) => {

  const publicKey = "public_p9xGK8Ln6FgEzum27kuv+4/9Qds=";
  const urlEndpoint = "https://ik.imagekit.io/hokmvk3ns";
  const authenticationEndpoint = "http://localhost:8080/imagekit/auth";

  return (
    <div>
      <IKContext publicKey={publicKey} urlEndpoint={urlEndpoint} authenticationEndpoint={authenticationEndpoint}>
        <div className={style.body}>
          <div className={style.card}>
            <div className={style.cardBody}>
              <IKImage path={image} className={style.cardImage}/>
              <h2 className={style.cardTitle}>{name}</h2>
              <hr className={style.cardline} />
              <p className={style.cardDesc}>{description}</p>
            </div>
            <label
              className={style.cardBtn}
              htmlFor="modal-1"
              onClick={() => viewRecipe(id)}
            >
              View Full Receipe
            </label>
            <div className={style.socials}>
              <button className={style.Btn}>
                <img src={like} alt="like" />
              </button>
              <button className={style.Btn}>
                <img src={share} alt="share" />
              </button>
              <button className={style.Btn}>
                <img src={save} alt="save" />
              </button>
            </div>
          </div>
        </div>
      </IKContext>
    </div>
  );
};

export default RecipeTile;

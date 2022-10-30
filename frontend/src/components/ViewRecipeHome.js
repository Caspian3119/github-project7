import React from "react";
import style from "./RecipeTile.module.css";
import { IKImage, IKVideo, IKContext, IKUpload } from 'imagekitio-react';

const ViewRecipeHome = ({ image, name, ingredients, procedure, cancel }) => {

  const onCancelEdit = (e) => {
    e.preventDefault();
    cancel(false);
  };

  const publicKey = "public_p9xGK8Ln6FgEzum27kuv+4/9Qds=";
  const urlEndpoint = "https://ik.imagekit.io/hokmvk3ns";
  const authenticationEndpoint = "http://localhost:8080/imagekit/auth";
  
  return (
    <div>
      <IKContext publicKey={publicKey} urlEndpoint={urlEndpoint} authenticationEndpoint={authenticationEndpoint}>
        <input className={style.modalState} id="modal-1" type="checkbox" />
        <div className={style.modal}>
          <label className={style.modalBg} htmlFor="modal-1"></label>
          <div className={style.modalInner}>
            <label
              className={style.modalClose}
              htmlFor="modal-1"
              onClick={onCancelEdit}
            ></label>
            <h2 className={style.header}>{name}</h2>
            <p>
              <IKImage path={image}/>
            </p>
            <h2 className={style.subHeader}> Ingredients </h2>
            <br />
            <p> {ingredients}</p>
            <br />
            <h2 className={style.subHeader}> Instructions </h2>
            <br />
            <p> {procedure}</p>
          </div>
        </div>
      </IKContext>
    </div>
  );
};

export default ViewRecipeHome;

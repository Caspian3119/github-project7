import React, { useState, useEffect } from "react";
import style from "./RecipeTileProfile.module.css";
import edit from "../FE/images/edit.png";
import deletebtn from "../FE/images/delete.png";
import axios from "axios";
import { IKImage, IKVideo, IKContext, IKUpload } from 'imagekitio-react';
import Modal from 'react-modal';

const RecipeTileProfile = ({
  accountId,
  id,
  image,
  name,
  description,
  editClick,
  viewRecipe,
}) => {

  const publicKey = "public_p9xGK8Ln6FgEzum27kuv+4/9Qds=";
  const urlEndpoint = "https://ik.imagekit.io/hokmvk3ns";
  const authenticationEndpoint = "http://localhost:8080/imagekit/auth";
  const [recipes, setRecipes] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);

  const openDeleteModalMessage = () => {
    setDeleteModal(true);
  }

  const closeDeleteModalMessage = () => {
    setDeleteModal(false);
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: "1px solid blue"
    },
  };

  useEffect (() => {
    axios.get(`http://localhost:8080/api/v1/recipes/${accountId}`).then((response) => {
      if (response.data.length > 0) {
        setRecipes(response.data);
      }
    });
  }, []);

  const onSuccess = (res, id) => {
    const updateDetails = {
      image: res.filePath
    }

    axios.put(`http://localhost:8080/api/v1/recipes/edit-recipe/${id}`, updateDetails).then((response) => {
      axios.get(`http://localhost:8080/api/v1/recipes/${accountId}`).then((response) => {
        if (response.data.length > 0) {
          setRecipes(response.data);
          window.location.reload();
        }
      });
    });
  };

  const onError = (res, id) => {
    console.log(res)
  };

  // const deleteRecipe = async () => {
  //   await axios.delete(`http://localhost:8080/api/v1/recipes/${id}`).then((response) => {
  //     console.log(response);
  //     window.location.reload();
  //   });
  // }

  return (
    <div>
      
      <IKContext publicKey={publicKey} urlEndpoint={urlEndpoint} authenticationEndpoint={authenticationEndpoint}>
        <div className={style.body}>
        <div className={style.card}>
          <div>
            <div className={style.cardBody}>
              <IKImage path={image} className={style.cardImage}/>
              <IKUpload onSuccess={(res) => onSuccess(res, id)} onError={(res) => onError(res, id) } className={style.cardUpload}/>
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
              <label htmlFor="modal-edit" onClick={() => editClick(id)}>
                <img src={edit} alt="edit" />
              </label>
              <button 
                onClick={() => {
                  if (
                    window.confirm("Are you sure you want to delete this recipe?")
                  ) {
                    axios
                      .delete(`http://localhost:8080/api/v1/recipes/${id}`)
                      .then((response) => {
                        console.log(response);
                        window.location.reload();
                      });
                  }
                }}
              >
                <img src={deletebtn} alt="delete" />
              </button>
            </div>
          </div>
          </div>
        </div>
      </IKContext>

      {/* <Modal
        isOpen={deleteModal}
        onRequestClose={closeDeleteModalMessage}
        style={customStyles}
        ariaHideApp={false}
      >
        <div>
          <p>
            Are you sure you want to delete this recipe?
          </p>
          <div>
            <div>
              <button onClick={() => {deleteRecipe()}}>
                <p>Delete</p>
              </button>
              <button onClick={closeDeleteModalMessage}>
                <p>Cancel</p>
              </button>
            </div>
          </div>
        </div>
      </Modal> */}

    </div>
  );
};

export default RecipeTileProfile;

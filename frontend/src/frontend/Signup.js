import React, { useState } from 'react'
import style from './signup.module.css'
import { FcGoogle } from "react-icons/fc";
import { FcRegisteredTrademark } from "react-icons/fc";
import { FcPortraitMode } from "react-icons/fc";
import axios from 'axios';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';


function Signup() {

  const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [detailsModal, setDetailsModal] = useState(false);

    const openDetailsModalMessage = () => {
      setDetailsModal(true);
    }

    const closeDetailsModalMessage = () => {
      setDetailsModal(false);
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    }

    const handleNewUser = () => {
      let newUserObj = {}
      newUserObj['username'] = username
      newUserObj['email'] = email
      newUserObj['password'] = password
      newUserObj['created_at'] = ""
      if (newUserObj.first_name === "" || newUserObj.last_name === "" || newUserObj.email === "" || newUserObj.password === "") {
        openDetailsModalMessage();
      } else {
          axios.post("http://localhost:8080/api/v1/accounts", newUserObj).then((res) => {
              if (res.data.success === true) {
                console.log("Success!");
                // navigate("/login");
              } else {
                alert("User registration failed!");
              }
          });
          navigate("/login");
          window.location.reload();
      }
    }

  return (
    <div className={style.container}>
      <div className={style.form}>
        <div className={style.SignInSection}>
          <h1>SIGN UP</h1>
            <form>
                <div className={style.formField}>
                    <label htmlFor="username">Username</label>
                    <input 
                        id="username" 
                        name="username"
                        type="text" 
                        placeholder="Userame" 
                        required 
                        value={username} 
                        onChange={handleChange}
                    />
                </div>
                <div className={style.formField}>
                    <label htmlFor="email">Email Address</label>
                    <input 
                        id="email" 
                        name="email"
                        type="email" 
                        placeholder="Your email address" 
                        required 
                        value={email} 
                        onChange={handleChange}
                    />
                </div>
                <div className={style.formField}>
                    <label htmlFor="password">Password</label>
                    <input 
                        id="password" 
                        name="password" 
                        type="password" 
                        placeholder="Password" 
                        required 
                        value={password} 
                        onChange={handleChange}
                    />
                </div>
                <div className={style.formField}>
                    <input 
                        type="submit" 
                        className={style.btn} 
                        value="Create an account" 
                        onClick={handleNewUser}
                    />
                </div>
            </form>
            <p className={style.login} >Already have an account? <a href='/login'>LOG IN HERE</a></p>
        </div>
      </div>

      <Modal
        isOpen={detailsModal}
        onRequestClose={closeDetailsModalMessage}
        style={customStyles}
        ariaHideApp={false}
      >
        <div>
          <p>
            All input fields shall not be empty!
          </p>
          <div>
            <div>
              <button onClick={closeDetailsModalMessage}>
                <p>Go Back</p>
              </button>
            </div>
          </div>
        </div>
      </Modal>

    </div>
  )
}

export default Signup
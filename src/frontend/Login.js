import React, { useEffect } from 'react'
import style from './login.module.css'
import { FcGoogle } from "react-icons/fc";
import { FcRegisteredTrademark } from "react-icons/fc";
import { FcPortraitMode } from "react-icons/fc";
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';

function Login() {

    const {setToken, token} = useAuth();

    // VARIABLES DECLARATION
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [detailsModal, setDetailsModal] = useState(false);
    const [logInErrorModal, setlogInErrorModal] = useState(false);


    const openDetailsModalMessage = () => {
      setDetailsModal(true);
    }

    const closeDetailsModalMessage = () => {
      setDetailsModal(false);
    }

    const openLogInErrorModalMessage = () => {
      setlogInErrorModal(true);
    }

    const closeLogInErrorModalMessage = () => {
      setlogInErrorModal(false);
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

    useEffect(() => {
      if (token !== null) {
          console.log(token)
          navigate('/')
      }
    }, []);

    // HANDLE INPUT FIELDS
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else {
            setPassword(value);
        }
    }

    // LOGIN FUNCTION
    const handleLogin = (e) => {
        e.preventDefault()
        if (email === "" || password === "") {
            openDetailsModalMessage();
        } else {
            axios.post("https://project-7-back-end.herokuapp.com/api/v1/accounts/login", {email: email, password: password }).then((res) => {
                if (res.data.success) {
                    const token = res.data.jwttoken
                    localStorage.setItem('token', token);
                    setToken(localStorage.getItem('token'));
                    navigate('/');
                } else {
                  openLogInErrorModalMessage();
                }
            });
        }
    }

  return (
    <div>
      <section className={style.login}>
        <div className={style.loginBox}>
          <div className={style.left}>
          <div className={style.contact}>
              <form>
              <h3>LOG IN</h3>
                  <input 
                      id="email"
                      type="email" 
                      name="email"
                      placeholder="EMAIL ADDRESS" 
                      required
                      value={email}
                      onChange={handleChange}
                  />
                  <input 
                      id="password" 
                      type="password" 
                      name="password"
                      placeholder="PASSWORD" 
                      required
                      value={password}
                      onChange={handleChange}
                  />
                  <p> Forgot Password?</p>
                  <button 
                      type="submit" 
                      className={style.submit}
                      value="Submit" 
                      onClick={handleLogin}>
                      LOG IN
                  </button>
              <span className={style.signup}> Need an account? <a href='/signup'> SIGN UP HERE</a></span>
              </form>
              </div>
        </div>
                  <div className={style.right}>
          <div className={style.rightInd}>
          </div>
          </div>
          </div>
      </section>

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

      <Modal
        isOpen={logInErrorModal}
        onRequestClose={closeLogInErrorModalMessage}
        style={customStyles}
        ariaHideApp={false}
      >
        <div>
          <p>
            Please check.
            E-mail address or password did not match.
          </p>
          <div>
            <div>
              <button onClick={closeLogInErrorModalMessage}>
                <p>Go Back</p>
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Login

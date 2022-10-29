import React from "react";
import "../styles.css";
import style from './Nav.module.css'
import { Link } from "react-router-dom";
import DropDown from "./Dropdown"
import logo from "../FE/images/HAPAG.png"
import search from "../FE/images/search.png"
import profile from "../FE/images/profile.png"

export default function Nav() {
  return (
    <div className="navbar">
      <ul className="nav-links">
        
        <Link to="/"
        className={style.logo}>
        <img src={logo} alt="hapag"/>
        </Link>
        <Link to="/profile"
        className={style.profile}>
        <img src={profile} alt="me"/>
        </Link>
        <span>
            <img src={search} alt="search" className={style.search}/>
        </span>
        <span>
        <DropDown placeHolder="" className={style.dropdown} />
        </span>
      </ul>
    </div>
  );
}


import React, { useState } from "react";
import style from "./dropdown.module.css";

export default function Dropdown({ placeHolder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(placeHolder);

  const toggle = () => setIsOpen(!isOpen);

  const handleSelect = (e) => {
    setSelected(e.target.value);
    setIsOpen(false);
  };

  return (
    <div className={style.dropdown}>
      <div className={style.dropdownHeader} onClick={toggle}>
        <span>{selected}</span>
        <span >{isOpen ? "⤬": "⋮"}</span>
      </div>
      {isOpen && (
        <div className={style.dropdownList}>
          <a className={style.dropdownLinks} onClick={handleSelect}>Edit Profile</a>
          <a className={style.dropdownLinks} onClick={handleSelect}>Edit Password</a>
          <a className={style.dropdownLinks} onClick={handleSelect}>Logout</a>
        </div>
      )}
    </div>
  );
}

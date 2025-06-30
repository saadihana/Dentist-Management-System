import React from "react";
import imagePath from "../assets/logo.jpg";


function HeaderForm() {
  return (
    <header className="header">
      <img  className="header-img"src={imagePath} width="60" height="75" />
      <h1 className="HeaderTitle">Fiche Patients</h1>
      <i></i>
    </header>
  );
}

export default HeaderForm;

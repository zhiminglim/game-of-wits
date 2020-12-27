import React from "react";
import Navbar from "react-bootstrap/Navbar";
import brandImg from "../assets/images/winner_gold.png";

function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <div className="header-brand-container">
        <Navbar.Brand href="/">
          <img
            alt=""
            src={brandImg}
            width="50"
            height="50"
            className="d-inline-block align-top"
          />{" "}
          Game of WITs
        </Navbar.Brand>
      </div>
    </Navbar>
  );
}

export default Header;

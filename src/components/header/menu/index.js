import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { FaUser } from "react-icons/fa";
import LogoColor from "../../../assets/images/logo-color.png";
import { useNavigate } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
function Menu() {
  const Email = sessionStorage.getItem("Email");
  //const [isSearch, setIsSearch] = useState(false);
  //const openSearch = () => {
  //setIsSearch((prevState) => !prevState);
  //};

  const navigate = useNavigate();
  const Logout = () => {
    sessionStorage.removeItem("Email");
    sessionStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <>
      <div className="menu">
        <div className="logo">
          <Link to={"/"}>
            <img src={LogoColor} className="logo" alt="Logo" />
          </Link>
        </div>

        <div className="navbar">
          <li>
            <Link to={"/"} className="menu-item">
              Home
            </Link>
          </li>
          <li>
            <Link to={"/"} className="menu-item">
              About
            </Link>
          </li>
          <li>
            <Link to={"/"} className="menu-item">
              New
            </Link>
          </li>
        </div>

        <div className="menu-icon">
          <div className="search">
            <div className="bar">
              <input type="search" name="search" placeholder="Search....." />
              <button class="search-btn" type="submit">
                <span>
                  <IoSearchSharp />
                </span>
              </button>
            </div>
            {/*<div className={`search ${isSearch ? "active" : ""}`}>
              <input type="search" placeholder="Tìm kiếm....." />
            </div>
            <Link to={"#"} className="menu-item" onClick={openSearch}>
              <IoSearchSharp />
            </Link>*/}
          </div>
          <div className="info-main">
            {Email ? (
              <div className="dropdown">
                <button
                  className="btn profile-button dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  User
                </button>
                <ul className="dropdown-menu">
                  <li>{Email}</li>

                  <li>
                    <Link className="btn" to={"/userProfile"}>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button className="btn" onClick={Logout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to={"/login"} className="menu-item">
                <FaUser />
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;

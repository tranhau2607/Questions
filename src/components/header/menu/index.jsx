import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './style.css';
import { IoSearchSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import LogoColor from '../../../assets/images/logo-color.png';

function Menu() {

    const [isSearch, setIsSearch] = useState(false);
    const openSearch = () => {
        setIsSearch(prevState => !prevState);
    };

    return (
        <>
            <div className="menu">
                <div className="logo">
                    <Link to={"/"}>
                        <img src={LogoColor} className='logo' alt='Logo' />
                    </Link>
                </div>
                <div className="navbar">
                    <li>
                        <Link to={"/"} className="menu-item">Home</Link>
                    </li>
                    <li>
                        <Link to={"/about"} className="menu-item">About</Link>
                    </li>
                </div>
                <div className="menu-icon">
                    <div >
                        <div className={`search ${isSearch ? 'active' : ''}`}>
                            <input type="search" placeholder="Tìm kiếm....." />
                        </div>
                        <Link to={"#"} className="menu-item" onClick={openSearch}>
                            <IoSearchSharp />
                        </Link>
                    </div>
                    <Link to={"/"} className="menu-item">
                        <FaUser />
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Menu;
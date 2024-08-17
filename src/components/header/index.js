import React from "react";
import Menu from './menu'
import './style.css'
const Header=()=> {
    return (
        <>
            <div className="header">
                <div className="fixed">
                    <div className="container">
                        <Menu />
                    </div>
                </div>

            </div>

        </>
    );
}

export default Header
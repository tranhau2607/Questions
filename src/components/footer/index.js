import "./style.css";
import Logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="p-3">
                <Link to={"/"}>
                  <img src={Logo} className="logo" alt="Logo" />
                </Link>
              </div>
            </div>
            <div className="col">
              <div className="">
                Primary Pages
                <li className="p-3">Home</li>
                <li className="p-3">About</li>
              </div>
            </div>
            <div className="col">
              <div className="">
                Group 12
                <li className="p-3">Minh Tâm</li>
                <li className="p-3">Phạm Khang</li>
                <li className="p-3">Trần Hậu</li>
              </div>
            </div>
          </div>
          <hr></hr>
          <p className="copyright">Copyright 2024 - Group 12</p>
        </div>
      </div>
    </>
  );
};

export default Footer;

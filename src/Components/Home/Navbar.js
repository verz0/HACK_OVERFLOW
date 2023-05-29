import React from "react";
import { LogoutOutlined, StockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { signOutUser } from "../../library/firebase";
import './navbar.css'

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const onClickLogout = () => {
    signOutUser().then((data) => {
      localStorage.removeItem("user");
      navigate("/");
    });
  };

  const renderUserElements = () => {
    if (user) {
      return (
        <>
          <li>
            <UserOutlined /> {user.email}
          </li>
          <li>
            <button onClick={onClickLogout} className="SignOutBtn">
              <LogoutOutlined /> Signout
            </button>
          </li>
        </>
      );
    } else {
      return (
        <li>
          <Link to="/Signin" className="navLink">Login</Link>
        </li>
      );
    }
  };

  return (
    <div className="navbar">
      <h2>
        <StockOutlined /> Trackeroo
      </h2>
      <ul>
        <li>
          <Link to="/" className="navLink">HOME</Link>
        </li>
        <li>
          <Link to="/Insight" className="navLink">Insights</Link>
        </li>
        <li>
          <Link to="/Dashboard" className="navLink">Manage</Link>
        </li>
        {renderUserElements()}
      </ul>
    </div>
  );
};

export default Navbar;

import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../App";

function Navbar() {
  let { isLogin, setIsLogin } = useContext(MyContext);
  let token = localStorage.getItem("token");

  const navigate = useNavigate();

  if (token) {
    setIsLogin(true);
  } else {
    setIsLogin(false);
  }

  const LogOut = () => {
    localStorage.clear();
  };

  return (
    <div className="navbar">
      <nav className="navbar navbar-expand-sm bg-primary navbar-dark w-100">
        <a className="navbar-brand mx-4" href="#">
          Products
        </a>

        <ul className="navbar-nav">
          {isLogin && (
            <li className="nav-item mx-4">
              <Link className="nav-link" to={"/courses"}>
                Course
              </Link>
            </li>
          )}
          {isLogin && (
            <li className="nav-item mx-4">
              <a className="nav-link" href="#">
                Animals
              </a>
            </li>
          )}
          {isLogin && (
            <li className="nav-item mx-4">
              <a className="nav-link" href="#">
                Fruits
              </a>
            </li>
          )}
          {isLogin && (
            <li className="nav-item mx-4">
              <a className="nav-link" href="#">
                Cars
              </a>
            </li>
          )}
          {!isLogin && (
            <li className="nav-item mx-4">
              <Link className="nav-link" to={"/login"}>
                Login
              </Link>
            </li>
          )}
          {!isLogin && (
            <li className="nav-item mx-4">
              <Link className="nav-link" to={"/register"}>
                Register
              </Link>
            </li>
          )}
          {isLogin && (
            <li className="nav-item mx-4">
              <Link className="nav-link" to={"/login"} onClick={LogOut}>
                LogOut
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;

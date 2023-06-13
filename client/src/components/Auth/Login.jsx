import React from "react";
import babu from "../../assets/images/01.jpg";
import { BsFacebook, BsInstagram, BsGithub } from "react-icons/bs";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="auth-body">
      <div className="auth-wraper">
        <div className="auth-featured">
          <img src={babu} alt="" />
        </div>
        <div className="auth-form">
          <h2>Sign In</h2>
          <div className="form-wraper">
            <form action="">
              <div className="form-group">
                <label htmlFor="">Email</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label htmlFor="">Password</label>
                <input type="password" />
              </div>
              <div className="form-group">
                <button>Log In</button>
              </div>
            </form>
          </div>
          <div className="utility">
            <a href="#">Forgot password</a>
            <Link to="/register">Create an Account</Link>
          </div>
          <div className="social-login">
            <a href="#">
              <BsFacebook />
            </a>
            <a href="#">
              <BsInstagram />
            </a>
            <a href="#">
              <BsGithub />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

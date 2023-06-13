import React, { useState } from "react";
import babu from "../../assets/images/02.jpg";
import { BsFacebook, BsInstagram, BsGithub } from "react-icons/bs";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  //useState
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  //handleChange
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //handleRegister
  const handleRegister = (e) => {
    e.preventDefault();

    //get data with axios
    axios
      .post("http://localhost:5050/api/v1/auth/register", input)
      .then((res) => {
        console.log(res.data);
        setInput({
          name: "",
          email: "",
          password: "",
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="auth-body">
      <div className="auth-wraper">
        <div className="auth-featured">
          <img src={babu} alt="" />
        </div>
        <div className="auth-form">
          <h2>Sign Up</h2>
          <div className="form-wraper">
            <form onSubmit={handleRegister} action="">
              <div className="form-group">
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  name="email"
                  value={input.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Password</label>
                <input
                  type="text"
                  name="password"
                  value={input.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <button type="submit">Register Now</button>
              </div>
            </form>
          </div>
          <div className="utility">
            <a href="#">Forgot password</a>
            <Link to="/login">Log In now</Link>
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

export default Register;

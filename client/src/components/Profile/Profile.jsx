import React from "react";
import avatar from "../../assets/images/avatar.png";
import profileBabu from "../../assets/images/babu.jpg";

const Profile = () => {
  return (
    <div className="profile-body">
      <div className="profile-wraper">
        <div className="profile-info">
          <div className="user info">
            <img src={avatar} alt="" />
            <h3>Mr. Mamu</h3>
          </div>
          <hr />
          <div className="user-menu">
            <ul>
              <li className="active">
                <a href="#">
                  <i className="fa fa-user-md"></i> Profile
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-edit"></i> Edit
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-unlock-alt"></i> Change Password
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-camera"></i> Profile Photo
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-sign-out"></i> Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="profile-box">
          <div className="profile-details">
            <div className="profile-photo">
              <img src={profileBabu} alt="" />
              <h2>Mr. Mamu</h2>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

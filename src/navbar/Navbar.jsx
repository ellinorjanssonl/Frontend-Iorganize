import React, { useState, useRef, useEffect } from "react";
import "./NavbarStyle.css";
import { Link, useNavigate } from "react-router-dom";
import { UniversalButton } from "@niklaspelli/fwk4-23-components";

const Navbar = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [userData, setUserData] = useState({
    userName: null,
    userImage: null,
  });

  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  const openSidenav = () => setIsSideNavOpen(true);
  const closeSidenav = () => setIsSideNavOpen(false);

  const getUserValues = () => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserData({
        userName: user.username,
        userImage: user.profileImage,
      });
    }
  };

  useEffect(() => {
    getUserValues();
    function handleClickOutside(event) {
      if (
        isSideNavOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsSideNavOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSideNavOpen]);

  const handleLogout = () => {
    console.log("Logout button has been clicked!");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div>
      {!isSideNavOpen && (
        <button
          className="openNavButton"
          onClick={openSidenav}
          aria-label="Open navbar"
        >
          ☰
        </button>
      )}
      {isSideNavOpen && (
        <div
          className={`sidenav ${isSideNavOpen ? "open" : "closed"}`}
          ref={sidebarRef}
        >
          <button
            type="button"
            className="closeNavButton"
            onClick={closeSidenav}
            aria-label="Close navigation"
          >
            X
          </button>
          <nav>
            <ul>
              <li>
                <Link to="/home">HOME</Link>
              </li>
              <li>
                <Link to="/workspace">WORKSPACE</Link>
              </li>
              <li>
                <Link to="/profile">PROFILE</Link>
              </li>
            </ul>
          </nav>
          <div>
            {userData.userImage && (
              <img src={userData.userImage} alt="user img" />
            )}
            {userData.userName && <p>Hello {userData.userName}</p>}
          </div>
          <UniversalButton
            title="LOGOUT"
            type="button"
            onClick={handleLogout}
          ></UniversalButton>
        </div>
      )}
    </div>
  );
};

export default Navbar;

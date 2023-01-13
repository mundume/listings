import React from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { ReactComponent as OfferIcon } from "../assets/svg/localOfferIcon.svg";
import { ReactComponent as ExploreIcon } from "../assets/svg/exploreIcon.svg";
import { ReactComponent as PersonOutlineIcon } from "../assets/svg/personIcon.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathMatchRoute = (route) => {
    if (route == location.pathname) {
      return true;
    }
  };
  return (
    <footer className="navbar">
      <nav className="navbarNav">
        <ul className="navbarListItems">
          <li className="navbarListItem">
            <ExploreIcon
              fill={pathMatchRoute("/") ? "#2c2c2c" : "#8f8f8f"}
              height="36px"
              onClick={() => navigate("/")}
            />
            <p>explore</p>
          </li>
          <li className="navbarListItem">
            <OfferIcon
              fill={pathMatchRoute("/offers") ? "#2c2c2c" : "#8f8f8f"}
              height="36px"
              onClick={() => navigate("/offers")}
            />
            <p>offers</p>
          </li>
          <li className="navbarListItem">
            <PersonOutlineIcon
              fill={pathMatchRoute("/profile") ? "#2c2c2c" : "#8f8f8f"}
              height="36px"
              onClick={() => navigate("/profile")}
            />
            <p>profile</p>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Navbar;

import React, { useEffect, useState } from "react";
import classes from "./Navigation.module.css";
import logo from "../../images/logo.svg";
import cart from "../../images/icon-cart.svg";
import avatar from "../../images/image-avatar.png";

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Cart from "../Cart/Cart";

const Navigation = () => {
  const totalQuantity = useSelector((state) => state.totalQuantity);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    if (totalQuantity !== 0) {
      setShowAnimation((prevState) => !prevState);
    }
  }, [totalQuantity]);

  const showCartHandler = () => {
    setShowCart((prevState) => !prevState);
  };

  return (
    <header>
      <nav className={classes.navigation}>
        <div className={classes.hamburger}>
          <span></span>
        </div>
        <ul className={classes.menu}>
          <li>
            <img src={logo} alt="logo" />
          </li>
          <li>
            <NavLink to="/">Collections</NavLink>
          </li>
          <li>
            <NavLink to="/">Men</NavLink>
          </li>
          <li>
            <NavLink to="/">Women</NavLink>
          </li>
          <li>
            <NavLink to="/">About</NavLink>
          </li>
          <li>
            <NavLink to="/">Contact</NavLink>
          </li>
        </ul>
        <ul className={classes.profile}>
          <li className={classes.cart} onClick={showCartHandler}>
            <img src={cart} alt="cart" />
            {totalQuantity !== 0 && (
              <span
                className={`${classes.quantity} ${
                  showAnimation ? classes.expand1 : classes.expand2
                }`}
              >
                {totalQuantity}
              </span>
            )}
          </li>
          <li className={classes.avatar}>
            <img src={avatar} alt="avatar" />
          </li>
        </ul>
      </nav>
      {showCart && <Cart></Cart>}
    </header>
  );
};

export default Navigation;

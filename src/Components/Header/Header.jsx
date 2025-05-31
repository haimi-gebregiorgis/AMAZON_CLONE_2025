import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import { BiCart } from "react-icons/bi";

import LowerHeader from "./Lower.Header";
import classes from "./Header.module.css";
import { DataContext } from "../DataProvider/DataProvider";

const Header = () => {
  const [{ basket }] = useContext(DataContext);
  const totalItem=basket?.reduce((amount, item) => item.amount + amount, 0);

  return (
    <section className={classes.fixed}>
      <section className={classes.header__container}>
        {/* Logo & Delivery Location */}
        <div className={classes.logo_container}>
          <Link to="/">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="Amazon Logo"
            />
          </Link>
          <div className={classes.delivery}>
            <span>
              <SlLocationPin />
            </span>
            <div>
              <p>Delivered to</p>
              <span>Ethiopia</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className={classes.search}>
          <select>
            <option value="">All</option>
          </select>
          <input type="text" placeholder="Search Amazon" />
          <button className={classes.searchIcon}>
            <FaSearch size={20} />
          </button>
        </div>

        {/* User Controls */}
        <div className={classes.order_container}>
          <Link to="" className={classes.language}>
            <img
              src="https://pngimg.com/uploads/flags/flags_PNG14592.png"
              alt="Language Icon"
            />
            <section>
              <option value="">EN</option>
            </section>
          </Link>

          <Link to="/auth">
            <div>
              <p>Sign In</p>
              <span>Account & Lists</span>
            </div>
          </Link>

          <Link to="/order">
            <p>Returns</p>
            <span>& Orders</span>
          </Link>

          <Link to="/cart" className={classes.cart}>
            <BiCart size={35} />
            <span>{totalItem}</span>
          </Link>
        </div>
      </section>

      {/* Lower Navigation */}
      <LowerHeader />
    </section>
  );
};

export default Header;

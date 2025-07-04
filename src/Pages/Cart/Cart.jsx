import React, { useContext } from "react";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Link } from "react-router-dom";
import {IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";


import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import LayOut from "../../Components/LayOut/LayOut";
import classes from "./Cart.module.css";
import { Type } from "../../Utility/action.type"; // Assuming you have an action type file

function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const total = basket.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  );
  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };
  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart_container}>
          <h2>Hello</h2>
          <h3>Your shopping cart</h3>
          <hr />
          {basket?.length == 0 ? (
            <p>Opps! No item in your cart</p>
          ) : (
            basket?.map((item, index) => {
              return (
                <section className={classes.cart_product}>
                  <ProductCard
                    key={item.id}
                    product={item}
                    renderDesc={true}
                    flex={true}
                    renderAdd={false}
                  />
                  <div className={classes.button_container}>
                    <button className={classes.button} onClick={() => increment(item)}><IoIosArrowUp size={20}/></button>
                    <span>{item.amount}</span>
                    <button className={classes.button} onClick={() => decrement(item.id)}><IoIosArrowDown size={20}/></button>
                  </div>
                </section>
              );
            })
          )}
        </div>
        {basket?.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>Subtotal({basket?.length} items)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              {" "}
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payments">Continue to checkout</Link>
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Cart;

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import classes from "./Product.module.css"; //   Assuming you have a CSS file for styling
import { DataContext } from "../DataProvider/DataProvider"; // Import your context
import { Type } from "../../Utility/action.type";

function ProductCard({ product, flex, renderDesc, renderAdd }) {
  const { id, image, title, rating, price, description } = product;

  const [state, dispatch] = useContext(DataContext);
  //console.log(state);
  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        id,
        image,
        title,
        rating,
        price,
        description,
      },
    });
  };

  return (
    <div
      className={`${classes.card_container} ${
        flex ? classes.product_flexed : ""
      }`}
      key={id}
    >
      <Link to={`/products/${id}`} className={classes.product_link}>
        <img src={image} alt="" />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{ maxWidth: "800px" }}> {description}</div>}
        <div className={classes.rating}>
          <Rating value={rating && rating.rate} precision={0.1} />
          <small>{rating && rating.count}</small>
        </div>
        <div>
          <CurrencyFormat amount={price} />
        </div>
        {renderAdd && (
          <button className={classes.button} onClick={addToCart}>
            add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;

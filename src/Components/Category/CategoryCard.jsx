import React from "react";
import { Link } from "react-router-dom";
import classes from "./Category.module.css"; // Assuming 

function CategoryCard({ data }) {
  return (
    <div className={classes.category}>
      <Link to={`/category/${data?.name}`} className={classes.category_link}>
        <span>
          <h2>{data?.title}</h2>
        </span>
        <img src={data?.image} alt="" />
        <p>shop now</p>
      </Link>
    </div>
  );
}

export default CategoryCard;

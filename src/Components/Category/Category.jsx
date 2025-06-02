import React from "react";
import { categoryInfo } from "./catagoryFullInfos.js";
import CategoryCard from "./CategoryCard";
import classes from "./Category.module.css";

function Category() {
  return (
    <section className={classes.category_container}>
      {categoryInfo.map((category, index) => (
        <CategoryCard key={index} data={category} />
      ))}
    </section>
  );
}


export default Category;

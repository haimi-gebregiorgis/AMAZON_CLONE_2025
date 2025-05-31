import React from "react";
import { categoryInfo } from "./catagoryFullInfos.js";
import CategoryCard from "./CategoryCard";
import classes from "./Category.module.css";

function Category() {
  return <section className={classes.category_container}>
    {
        categoryInfo.map((category, index) => {
            return (
            <div className={classes.category_container} key={index}>
                <CategoryCard
                data={category}
                />
            </div>
            );
        })
    }
  </section>;
}

export default Category;

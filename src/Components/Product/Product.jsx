import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./Product.module.css";
import { productUrl } from "../../Api/endPoints"; // Assuming you have a CSS file for styling

function Product() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${productUrl}/products`)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.product_container}>
          {products?.map((singleProduct) => {
            return <ProductCard product={singleProduct} key={singleProduct.id} renderAdd={true}/>;
          })}
        </section>
      )}
    </>
  );
}

export default Product;

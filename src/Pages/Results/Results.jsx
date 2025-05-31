import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { productUrl } from "../../Api/endPoints";
import LayOut from "../../Components/LayOut/LayOut";
import classes from "./Results.module.css";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";

function Results() {
  const { categoryName } = useParams();
  const [results, setResults] = useState([]);
  useEffect(() => {
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((response) => {
        setResults(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category / {categoryName}</p>
        <hr />
        <div className={classes.results_container}>
          {results?.map((product) => (
            <ProductCard key={product.id} product={product} renderAdd={true} />
          ))}
        </div>
     
      </section>
    </LayOut>
  );
}

export default Results;

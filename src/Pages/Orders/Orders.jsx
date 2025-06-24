import React, { useContext, useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import classes from "./Orders.module.css";
import ProductCard from "../../Components/Product/ProductCard";

function Orders() {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      return db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    }else{setOrders([])}
  }, []);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your Orders</h2>
          {orders?.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            orders.map((order) => (
              <div key={order.id}>
                <hr />
                <p>Order ID: {order?.id}</p>
                {/* You can expand this with more order details */}
                { order?.data?.basket?.map(order=>{
                  return <ProductCard flex={true} product={order} key={order.id} />
                })}
              </div>
            ))
          )}
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;

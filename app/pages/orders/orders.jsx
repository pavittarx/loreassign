import React, { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import {
  getOrder,
  deleteOrder,
} from "./../../libs/orders";

import "./orders.scss";

import { OrderModal } from "./../../components/index";


// Card for showing details of a single order
const Order = ({ id, name, quantity, date, status }) => {
  const [open, setOpen] = useState(false);
  // const [error, setError] = useState("");

  const remove = async () => {
    const response = await deleteOrder(id);
    if(response.error) setError(error);
    setTimeout(() => location.reload(), 2000);
  }

  return (
    <section className="order-item">
      {/* <Response success="" error={error} /> */}
      <div className="name">{name} </div>
      <div className="status">
        {quantity} | {status}{" "}
      </div>
      <div className="date">
        {new Date(date).toLocaleString("en-IN", { hour12: true })}{" "}
      </div>

      <div className="actions">
        <OrderModal
          id={id}
          orderN={name}
          orderQ={quantity}
          trigger={<Button icon="edit" color="orange" />}
          open={open}
          setOpen={setOpen}
        />
        <Button icon="trash" color="red" onClick={remove} />
      </div>
    </section>
  );
};

export const OrdersUI = () => {
  const [orders, setOrders] = useState([]);

  useEffect(async () => {
    const ordersList = await getOrder();
    if (ordersList.success) setOrders(ordersList.data);
  }, [setOrders]);

  return (
    <section className="orders-container">
      <div className="header"> Your Orders </div>
      <div className="orders-list">
        {orders &&
          orders.map((order) => (
            <Order
              key={order._id}
              name={order.orderName}
              quantity={order.orderQuantity}
              date={order.orderDate}
              status={order.orderStatus}
              id={order._id}
            />
          ))}
      </div>
    </section>
  );
};

import React, { useEffect, useState } from "react";
import { Modal, Dropdown, Input, Button } from "semantic-ui-react";
import { getOrders } from "./../../libs/orders";

import "./orders.scss";

import orderNamesData from "./../../data/items.json";


// A modal boc that would allow you to both add ad well as edit already placed orders
export const AddOrEditOrderModal = ({ open, setOpen, trigger }) => {
  const [orderName, setOrderName] = useState();
  const [orderQuantity, setOrderQuantity] = useState();

  const confirmOrder = async () => {
    setOpen(false);
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={trigger}
    >
      <Modal.Header> Place a new Order </Modal.Header>
      <Modal.Content>
        <AddOrEditOrderForm
          orderName={orderName}
          orderQuantity={orderQuantity}
          setOrderName={setOrderName}
          setOrderQuantity={setOrderQuantity}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button primary onClick={confirmOrder}>
          Confirm
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

// Part of AddOrEditOrdersModal
const AddOrEditOrderForm = ({
  orderName,
  orderQuantity,
  setOrderName,
  setOrderQuantity,
}) => {
  const nameOptions = orderNamesData.map((item, index) => ({
    key: index + 1,
    text: item.name,
    value: item.name,
  }));

  const changeName = (e, { value }) => setOrderName(value);

  return (
    <section className="add-or-edit-order-form">
      <Dropdown
        onChange={changeName}
        value={orderName}
        options={nameOptions}
        selection
        clearable
        placeholder="Choose your Order"
      ></Dropdown>
      <Input
        type="number"
        value={orderQuantity}
        onChange={(e) => setOrderQuantity(e.target.value)}
        placeholder="Enter Quantity"
      />
    </section>
  );
};

// Card for showing details of a single order
const Order = ({ id, name, quantity, date, status }) => {
  return (
    <section className="order-item">
      <div className="name">{name} </div>
      <div className="status">
        {quantity} | {status}{" "}
      </div>
      <div className="date">
        {new Date(date).toLocaleString("en-IN", { hour12: true })}{" "}
      </div>
    </section>
  );
};

export const OrdersUI = () => {
  const [orders, setOrders] = useState([]);

  const [open, setOpen] = useState(false);

  useEffect(async () => {
    const ordersList = await getOrders();
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

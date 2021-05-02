import React, { useEffect, useState } from "react";
import { Modal, Dropdown, Input, Button } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./components.scss";

import { orders } from "./../libs/index";
import orderNamesData from "./../data/items.json";
import {Response} from "./response";

const { addOrder, editOrder } = orders;
// A modal boc that would allow you to both add ad well as edit already placed orders
export const AddOrEditOrderModal = ({
  open,
  setOpen,
  trigger,
  id,
  orderN,
  orderQ,
}) => {
  const [orderName, setOrderName] = useState(orderN || "");
  const [orderQuantity, setOrderQuantity] = useState(orderQ || "");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const confirmOrder = async () => {
    setSuccess("");
    setError("");

    if (!id) {
      const response = await addOrder(orderName, orderQuantity);
      if (response.success) setSuccess(response.message);
      if (response.error) setError(response.message);
    }

    if (id) {
      const response = await editOrder(id, orderName, orderQuantity);
      if (response.success) setSuccess(response.message);
      if (response.error) setError(response.message);
    }

    setTimeout(() => {
      setOpen(false);
      location.reload();
    }, 2000);
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
        <Response success={success} error={error} />
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

export default AddOrEditOrderModal;

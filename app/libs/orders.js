import authAxios from "./../utils/axios";

export const getOrder = async () => {
  const token = window.localStorage.getItem("token");

  try {
    const response = await authAxios(token).get("/api/orders");
    return response.data;
  } catch (error) {
    const { response } = error;
    return response.data;
  }
};

export const addOrder = async (orderName, orderQuantity) => {
  const token = window.localStorage.getItem("token");

  try {
    const response = await authAxios(token).post("/api/orders", {
      orderName,
      orderQuantity,
    });
    return response.data;
  } catch (error) {
    const { response } = error;
    return response.data;
  }
};

export const editOrder = async (orderId, orderName, orderQuantity) => {
  const token = window.localStorage.getItem("token");

  try {
    const response = await authAxios(token).put("/api/orders", {
      orderId,
      orderName,
      orderQuantity,
    });
    return response.data;
  } catch (error) {
    const { response } = error;
    return response.data;
  }
};

export const deleteOrder = async (orderId) => {
  const token = window.localStorage.getItem("token");

  console.log("=> ", orderId);

  try {
    const response = await authAxios(token).delete("/api/orders", {
      data: { orderId },
    });
    return response.data;
  } catch (error) {
    const { response } = error;
    return response.data;
  }
};

export default {addOrder, editOrder, getOrder, deleteOrder};
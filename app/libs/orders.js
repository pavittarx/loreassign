import authAxios from "./../utils/axios";

export const getOrders = async () => {
  const token = window.localStorage.getItem("token");

  try {
    const response = await authAxios(token).get("/api/orders");
    console.log(response.data);
    return response.data;
  } catch (error) {
    const { response } = error;
    return response.data;
  }
};

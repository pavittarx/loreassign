const {db} = require("./connect");

const {USERS_COLLECTION, ORDERS_COLLECTION} = require("../utils/constants");

async function Users() {
  return await (await db).collection(USERS_COLLECTION);
}

async function Orders(){
  return await (await db).collection(ORDERS_COLLECTION);
}

module.exports = {
  Users,
  Orders
}
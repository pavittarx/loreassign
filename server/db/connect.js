const mongo = require("mongodb");

require("dotenv").config();

const { DB_NAME } = require("./../utils/constants");

const client = mongo.MongoClient(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

process.on("exit", async () => {
  await client.close();
});

async function connect() {
  return await client.connect();
}

const db = (async () => {
  return (await connect()).db(DB_NAME);
})();

module.exports = {
  mongo,
  client: connect(),
  db,
};
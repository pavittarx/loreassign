const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { Users } = require("./../db/collections");

const checkIfUserExists = async (usernameOrEmail) => {
  const query = {
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
  };

  const usersCollection = await Users();
  const user = await usersCollection.findOne(query);

  if (user) return true;
  else return false;
};

const createUser = async (username, email, password) => {
  if (!username) throw new Error("Username cannot be empty");
  if (!email) throw new Error("Email cannot be empty");
  if (!password) throw new Error("Password cannot be empty.");

  if (await checkIfUserExists(username))
    throw new Error(`A user with provided username already exists.`);
  if (await checkIfUserExists(email))
    throw new Error(`A user with provided email already exists.`);

  const usersCollection = await Users();
  const passHash = await bcrypt.hash(password, 10);

  const result = await usersCollection.insertOne({ username, email, passHash });

  if (result.insertedCount === 1) return "Your account has been succcessfully created. Please Login.";
  else
    return (
      "An unidentified error occured while creating user " + username + "."
    );
};

const updateUser = async (username, updateData) => {
  const usersCollection = await Users();
  const user = await usersCollection.findOne({ username });

  if (!user) throw new Error(`The user with ${username} does not exist`);

  const update = {
    $set: updateData,
  };

  const status = await usersCollection.updateOne({ username }, update);

  if (status) return `Successfully update user: ${username}`;
  else
    throw new Error(
      `Unable to update user: ${username}. Please try after sometime.`
    );
};

const getUser = async (usernameOrEmail) => {
  if (!usernameOrEmail) throw new Error("Please provide a username or email");

  const usersCollection = await Users();

  const query = {
    $or: [
      {
        username: usernameOrEmail,
      },
      { email: usernameOrEmail },
    ],
  };

  const user = await usersCollection.findOne(query);

  if (!user)
    throw new Error(`The user with username: ${username} does not exist.`);

  return user;
};

const deleteUser = async (username) => {
  const usersCollection = await Users();

  const query = {
    $or: [
      {
        username: usernameOrEmail,
      },
      {
        email: usernameOrEmail,
      },
    ],
  };

  const deletedUser = usersCollection.deleteOne(query);

  if (deleteUser.deletedCount === 1) return `User successfull deleted.`;
  else throw new Error(`Unable to delete User: ${username}`);
};

module.exports = {
  createUser,
  updateUser,
  getUser,
  deleteUser,
};

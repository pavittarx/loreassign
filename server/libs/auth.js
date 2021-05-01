const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {Users} = require("./../db/collections");


// Genrates Authorization JWT token for the  user
const authorize = async (usernameOrEmail, password) => {
  if(!usernameOrEmail && !password) 
    throw new Error("Missing Credentials: Please provide username, password.");

  const usersCollection = await Users();

  const query = {
    $or: [{
      username: usernameOrEmail
    }, {email: usernameOrEmail}]
  }

  const user = await usersCollection.findOne(query);

  console.log(password, user);

  if(!user) throw new Error(`The user with username: ${username} does not exist.`);

  if (!(await bcrypt.compare(password, user.passHash))) {
    throw new Error("Incorrect username or password: ${username}");
  }

  const token = await jwt.sign(
    {
      id: user._id,
      username: user.username
    },
    user.passHash
  );

  return token;
}

// Checks if the token provided is authentic
const authenticate = async (token) => {
  const tokenData = await jwt.decode(token);

  if(!tokenData){
    throw new Error("Invalid Token");
  }

  const users = await Users();
  const user = await users.findOne({username: tokenData.username});

  if(!user){
    throw new Error(`Your token seems to have been expired. Please log in to continue.`);
  }

  return {
    success: true,
    data: {
      id: user._id,
      username: user.username,
    }
  };
}

module.exports = {
  authorize,
  authenticate
}
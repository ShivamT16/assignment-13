const User = require("../models/user");

const signup = async (userDetails) => {
  try {
    const user = new User(userDetails);
    const newUser = await user.save();
    console.log("User created", newUser);
  } catch (error) {
    throw error;
  }
};

const login = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (user && user.password === password) {
      console.log(`${user.username} Logged-in successfully`);
      return user;
    } else {
      console.log("Credentials invalid");
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { signup, login };

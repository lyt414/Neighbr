// import model for querying db
const Users = require('../models/userModel');

// define and export services for request handlers

module.exports = {
  getAllUsers: () => (
    Users.find()
  ),
  getOneUser: (oneUsername) => (
    Users.find({ username: oneUsername })
  ),
  createUser: (newUsername) => (
    Users.create({
      username: newUsername
    })
  )
};

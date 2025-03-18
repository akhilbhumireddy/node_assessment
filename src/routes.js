const express = require("express");
const {
  loadUsers,
  deleteAllUsers,
  deleteUser,
  getUser,
  putUser,
} = require("./controller");

const router = express.Router();

router.get("/load", loadUsers);
router.delete("/users", deleteAllUsers);
router.delete("/users/:userId", deleteUser);
router.get("/users/:userId", getUser);
router.put("/users", putUser);

module.exports = router;

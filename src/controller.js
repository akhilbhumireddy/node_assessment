const connectDB = require("./db");
const { loadUsersWithPostsAndComments } = require("../dataLoader");

async function loadUsers(req, res) {
  try {
    const db = await connectDB();
    const users = await loadUsersWithPostsAndComments();
    await db.collection("users").insertMany(users);
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ message: "Failed to load users", error });
  }
}

async function deleteAllUsers(req, res) {
  try {
    const db = await connectDB();
    await db.collection("users").deleteMany({});
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete users", error });
  }
}

async function deleteUser(req, res) {
  try {
    const { userId } = req.params;
    const db = await connectDB();
    const result = await db
      .collection("users")
      .deleteOne({ id: parseInt(userId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error });
  }
}

async function getUser(req, res) {
  try {
    const { userId } = req.params;
    const db = await connectDB();
    const user = await db.collection("users").findOne({ id: parseInt(userId) });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to get user", error });
  }
}

async function putUser(req, res) {
  try {
    const newUser = req.body;
    const db = await connectDB();
    const existingUser = await db
      .collection("users")
      .findOne({ id: newUser.id });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    await db.collection("users").insertOne(newUser);
    res.status(201).location(`/users/${newUser.id}`).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Failed to insert user", error });
  }
}

module.exports = { loadUsers, deleteAllUsers, deleteUser, getUser, putUser };

const express = require("express");
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// PORT
const PORT = 3300;

// Array for Temporary Storage
const users = [{ id: 1, name: "Ravi" }];

// GET - all users
app.get("/users", (req, res) => {
  try {
    if (users.length === 0) {
      res.status(404).json({ message: "Users not found" });
    }
    res
      .status(200)
      .json({ message: "Users Found Successfully", users: allUsers });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET - get a single user
app.get("/users/:id", (req, res) => {
  try {
    const user = users.find((u) => u.id === Number(req.params.id)); // find a single (id base) user
    if (!user) {
      // when user is not found
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User Found", user: user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// POST = add a user
app.post("/users", (req, res) => {
  try {
    const checkExistingUser = users.find((user) => user.name === req.body.name);
    if (checkExistingUser) {
      res.status(409).json({ message: "User already exists" });
    }
    const createNewUser = { id: users.length + 1, name: req.body.name };
    users.push(createNewUser);
    res
      .status(201)
      .json({ message: "user register successfully", user: createNewUser });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// PUT = update user name
app.put("/users/:id", (req, res) => {
  try {
    const checkUserIsExist = users.find(
      (user) => user.id === Number(req.params.id)
    );
    if (!checkUserIsExist) {
      res.status(404).json({ message: "User not found" });
    }
    const updatedUser = (checkUserIsExist.name = req.body.name);
    res
      .status(200)
      .json({ message: "User update successfully", update: updatedUser });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//DELETE = Delete a single user
app.delete("/users/:id", (req, res) => {
  try {
    // Finds the index of the user using findIndex().
    const findUser = users.findIndex((u) => u.id === Number(req.params.id));
    if (findUser === -1) {
      // (-1 means "not found").
      res.status(404).json({ message: "User not found" });
    }
    const deletedUser = users[findUser]; // Store deleted user details
    users.splice(findUser, 1); // Remove the user from the array
    res.status(200).json({ message: "User deleted", deletedUser: deletedUser });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Server running
app.listen(PORT, () => {
  console.log(`Server running on the PORT:${"localhost:" + PORT}`);
});

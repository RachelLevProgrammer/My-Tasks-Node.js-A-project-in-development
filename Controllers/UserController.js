const User = require("../Models/UserModel");

async function createUser(req, res) {
  try {
    const newUser = req.body;
    const createNewUser = new User(newUser);
    await createNewUser.save();
    res.status(201).send(createNewUser);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}

async function deleteUser(req, res) {
  try {
    const UserName = req.params.name;
    const deletedUser = await User.findOneAndDelete({ name: UserName });
    if (!deletedUser) return res.status(404).send("User not found");
    res.send("Deleted: " + deletedUser.name);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

async function getUser(req, res) {
  try {
    const allUsers = await User.find();
    res.send(allUsers);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

async function updatedUser(req, res) {
  try {
    const UpdateName = req.params.name;
    const newUpdatedUser = req.body;

    const updatedUser = await User.findOneAndUpdate({ name: UpdateName }, newUpdatedUser, { new: true });
    if (!updatedUser) return res.status(404).send("User not found");

    res.send(updatedUser);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}

module.exports = { createUser, deleteUser, getUser, updatedUser };

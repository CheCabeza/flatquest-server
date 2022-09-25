const debug = require('debug')('app:usersController');
const User = require('../models/usersModel');

function usersController() {
  async function getAll(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.send(error);
    }

  }

  async function getProfile(req, res) {
    try {
      res.json({
        message: 'You made it to the secure route',
        user: req.user,
        token: req.headers.authorization,
      });
    } catch (error) {
      debug(error);
      res.status(404);
      res.send(error);
    }
  }

  async function updateById(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        { new: true },
      );
      res.json(updatedUser);
    } catch (error) {
      debug(error);
      res.send(error);
    }
  }

  return {
    getAll,
    getProfile,
    updateById,
  };
}

module.exports = usersController;

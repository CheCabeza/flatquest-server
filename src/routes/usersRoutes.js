const { Router } = require('express');
const usersController = require('../controllers/usersController')();

function usersRouter() {
  const routes = Router();

  routes
    .route('/')
    .get(usersController.getAll);

  routes
  .route('/:userId')
  .put(usersController.updateById);

  routes
    .route('/profile')
    .get(usersController.getProfile);

  return routes;
}

module.exports = usersRouter();

const { Router } = require('express');
const flatsController = require('../controllers/flatsController')();

function flatsRouter() {
  const routes = Router();

  routes
    .route('/')
    .get(flatsController.getAll);

  routes
    .route('/filter')
    .get(flatsController.filterFlats);

  routes
    .route('/:flatId')
    .get(flatsController.getById)
    .put(flatsController.reviewFlat);

  return routes;
}

module.exports = flatsRouter();

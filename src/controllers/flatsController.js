const debug = require('debug')('app:flatsController');
const flat = require('../models/flatsModel');

function flatsController() {
  async function getAll(req, res) {
    try {
      let findFlat = null;
      if (req.query.flatSearchValue) { findFlat = { address: { $regex: req.query.flatSearchValue, $options: 'i' } }; }
      res.json(await flat.find(findFlat));
      
    } catch (error) {
      res.send(error);
    }
  }

    async function filterFlats(req, res) {
      try {
        const filterFlat = { 
          rooms: { $gte: +req.query.rooms }, 
          toilet: { $gte: +req.query.baths }, 
          neighborhood: { $regex: req.query.neighborhood, $options: 'i' },
          price: { $gte: +req.query.min, $lte: +req.query.max }};
        res.json(await flat.find(filterFlat));
        
      } catch (error) {
        res.send(error);
      }
    }

    async function reviewFlat(req, res) {
      try {
        res.json(await flat.findByIdAndUpdate(req.params.flatId, req.body,));
        
      } catch (error) {
        res.send(error);
      }
    }

  async function getById(req, res) {
    try {
      const flatById = await flat.findById(
        req.params.flatId,
      );
      res.json(flatById);
    } catch (error) {
      debug(error);
      res.status(404);
      res.send(error);
    }
  }

  return {
    getAll,
    getById,
    filterFlats,
    reviewFlat,
  };
}

module.exports = flatsController;

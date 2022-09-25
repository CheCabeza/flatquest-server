const {
  getAll,
  getById,
} = require('./flatsController')();

const Flat = require('../models/flatsModel');

jest.mock('../models/flatsModel');

describe('getAll', () => {
  test('shoud get all flats', async () => {
    const res = {
      json: jest.fn(),
    };
    Flat.find.mockResolvedValueOnce([{ address: 'Calle Mayor' }]);

    await getAll(null, res);

    expect(res.json).toHaveBeenCalledWith([{ address: 'Calle Mayor' }]);
  });
});

describe('getById', () => {
  test('should call res.status with 404', async () => {
    const res = {
      json: jest.fn(),
      status: jest.fn(),
      send: jest.fn(),
    };

    const req = {
      params: {
        flatId: null,
      },
    };

    Flat.findById.mockRejectedValueOnce();

    await getById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  test('should call res.send with error', async () => {
    const res = {
      json: jest.fn(),
      status: jest.fn(),
      send: jest.fn(),
    };

    const req = {
      params: {
        flatId: null,
      },
    };

    Flat.findById.mockRejectedValueOnce('error');

    await getById(req, res);

    expect(res.send).toHaveBeenCalledWith('error');
  });

  test('should call res.json ', async () => {
    const res = {
      json: jest.fn(),
      status: jest.fn(),
      send: jest.fn(),
    };

    const req = {
      params: {
        flatId: null,
      },
    };

    Flat.findById.mockResolvedValueOnce('one flat');

    await getById(req, res);

    expect(res.json).toHaveBeenCalledWith('one flat');
  });
});
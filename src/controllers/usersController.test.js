const {
    getAll,
    getProfile,
  } = require('./usersController')();
  
  const User = require('../models/usersModel');
  
  jest.mock('../models/usersModel');
  
  describe('getAll', () => {
    test('shoud get all Users', async () => {
      const res = {
        json: jest.fn(),
      };
      User.find.mockResolvedValueOnce([{ name: 'Josep Tarradellas' }]);
  
      await getAll(null, res);
  
      expect(res.json).toHaveBeenCalledWith([{ name: 'Josep Tarradellas' }]);
    });
  });

  describe('getProfile', () => {
    test('shoud get users profile', async () => {
        const res = {
            json: jest.fn(),
            status: jest.fn(),
            send: jest.fn(),
          };

        const req = {
            headers: {
                authorization: null
            },
            user: null
        }
  
      await getProfile(req, res);
  
      expect(res.json).toHaveBeenCalledWith({ "message": "You made it to the secure route", "token": null, "user": null });
    });

    test('should call res.send with error', async () => {
        const res = {
            json: jest.fn(),
            status: jest.fn(),
            send: jest.fn(),
          };

        const req = {
            headers: {
                authorization: null
            },
            user: null
        }
    
        await getProfile(null, res);
    
        expect(res.send).toHaveBeenCalled;
      });

      test('should call res.send with error', async () => {
        const res = {
            json: jest.fn(),
            status: jest.fn(),
            send: jest.fn(),
          };

        const req = {
            headers: {
                authorization: null
            },
            user: null
        }
    
        await getProfile(null, res);
    
        expect(res.status).toHaveBeenCalledWith (404);
      });

  });
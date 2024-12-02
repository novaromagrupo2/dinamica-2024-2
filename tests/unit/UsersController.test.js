const UserController = require('../../app/controllers/api/UsersController');
const User = require('../../app/models/User');
const bcrypt = require('bcrypt');

jest.mock('../../app/models/User');
jest.mock('bcrypt');

describe('UserController', () => {
  describe('save', () => {
    let req, res;

    beforeEach(() => {
      req = {
        body: {
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
          password_confirmation: 'password123'
        }
      };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
    });

    it('should create a new user successfully', async () => {
      bcrypt.hash.mockResolvedValue('hashed_password');
      User.create.mockResolvedValue({
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashed_password'
      });

      await UserController.save(req, res);

      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(User.create).toHaveBeenCalledWith({
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashed_password'
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashed_password'
      });
    });

    it('should return an error if passwords do not match', async () => {
      req.body.password_confirmation = 'different_password';

      await UserController.save(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Os campos senha e confirmar senha são diferentes'
      });
    });
  });
});
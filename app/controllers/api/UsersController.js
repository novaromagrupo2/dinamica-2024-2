const User = require('../../models/User');
const bcrypt = require('bcrypt');

function UserController() {
  async function list(req, res) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] },
        raw: true,
      });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({
        message: 'Erro ao listar usuários',
      });
    }
  }

  async function show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({
          message: 'Usuário não encontrado',
        });
      }

      res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({
        message: 'Erro ao localizar usuário',
      });
    }
  }

  async function save(req, res) {
    const { name, email, password, password_confirmation } = req.body;

    try {
      const user = await User.create({
        name,
        email,
        password,
        password_confirmation, // Campo virtual
      });

      return res.status(201).json({
        message: 'Usuário criado com sucesso',
        user: { id: user.id, name: user.name, email: user.email },
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        message: error.message || 'Erro ao criar usuário',
      });
    }
  }


  async function remove(req, res) {
    const id = req.params.id;

    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          message: 'Usuário não encontrado',
        });
      }

      await User.destroy({ where: { id } });

      return res.status(200).json({
        message: 'Usuário removido com sucesso',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Erro ao remover usuário',
      });
    }
  }

  async function login(req, res) {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({
        where: { email: username },
      });

      if (!user) {
        return res.status(401).json({ message: 'Usuário não encontrado' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Senha incorreta' });
      }

      user.password = undefined;
      res.status(200).json({ message: 'Autenticação bem-sucedida', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro durante a autenticação' });
    }
  }

  return {
    save,
    list,
    show,
    remove,
    login,
  };
}

module.exports = UserController();

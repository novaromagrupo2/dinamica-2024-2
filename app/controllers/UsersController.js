const User = require('../models/User');
const bcrypt = require('bcrypt');

function UserController() {
  function list(req, res) {
    User.findAll({ raw: true })
      .then((data) => {
        res.render('users/list', {
          title: 'Lista de Usuários',
          users: data,
        });
      })
      .catch((err) => console.log(err));
  }

  function create(req, res) {
    res.render('users/create');
  }

  async function save(req, res) {
    const body = req.body;

    try {
      const user = await User.create({
        name: body.name,
        email: body.email,
        password: body.password,
        password_confirmation: body.password_confirmation, // Campo virtual
      });

      return res.redirect('/users');
    } catch (error) {
      console.error(error);
      res.render('users/create', {
        error: {
          message: error.message || 'Erro ao salvar o usuário. Tente novamente.',
        },
      });
    }
  }


  function remove(req, res) {
    const id = req.params.id;

    User.destroy({ where: { id } })
      .then(() => res.redirect('/users'))
      .catch((err) => console.log(err));
  }

  function edit(req, res) {
    const id = req.params.id;

    User.findOne({ where: { id }, raw: true })
      .then((data) => {
        res.render('users/edit', { user: data });
      })
      .catch((err) => console.log(err));
  }

  function update(req, res) {
    console.log(req.body);
    const id = req.body.id;

    const user = {
      name: req.body.name,
      email: req.body.email,
      active: req.body.active === '1',
    };

    User.update(user, { where: { id } })
      .then(() => res.redirect('/users'))
      .catch((err) => console.log(err));
  }

  function updateStatus(req, res) {
    const id = req.params.id;

    const user = {
      active: req.body.active === '0',
    };

    User.update(user, { where: { id } })
      .then(() => res.redirect('/users'))
      .catch((err) => console.log(err));
  }

  return {
    create,
    save,
    list,
    remove,
    edit,
    update,
    updateStatus,
  };
}

module.exports = UserController();

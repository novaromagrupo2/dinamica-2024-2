const { DataTypes } = require('sequelize');
const { sequelize } = require('../core/sequelize');

const table_options = {
  tableName: 'users',
};

const User = sequelize.define(
  'User',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password_confirmation: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
    },
    api_key: {
      type: DataTypes.STRING(64),
    },
    active: {
      type: DataTypes.BOOLEAN,
    },
  },
  table_options
);

// Hook para validar a confirmação de senha antes de salvar
User.beforeSave((user) => {
  if (!user.password_confirmation) {
    throw new Error('Confirmação de senha não fornecida.');
  }
  if (user.password !== user.password_confirmation) {
    throw new Error('As senhas não conferem');
  }
});

module.exports = User;

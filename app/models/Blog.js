const { DataTypes } = require("sequelize");
const { sequelize } = require("../core/sequelize");

const Blog = sequelize.define("Blog", {
  title: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  publishedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Blog


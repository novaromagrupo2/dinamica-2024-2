const { sequelize, createDatabase } = require("./app/core/sequelize");
const Blog = require("./app/models/Blog");

async function syncDatabase() {
  try {
    await createDatabase(sequelize);
    console.log("Banco de dados sincronizado com sucesso.");
  } catch (error) {
    console.error("Erro ao sincronizar o banco de dados:", error);
  } finally {
    await sequelize.close();
  }
}

syncDatabase();
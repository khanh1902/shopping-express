const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

sequelize
  .authenticate() // check connect
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, DataTypes);
db.categories = require("./category.model.js")(sequelize, DataTypes);

db.users.hasMany(db.categories, { foreignKey: "userId" });
db.categories.belongsTo(db.users, {foreignKey: "userId"});

// sequelize create and update mysql
db.sequelize.sync({ alter: true }).then(() => {
    console.log("Database match tables Successfully");
  });

module.exports = { db };

import Sequelize from "sequelize";
import fs from "fs";
import path from "path";

const db = new Sequelize("dashboard_management", "root", "", {
  host: "localhost",
  // port: "5000",
  dialect: "mysql",
  define: {
    freezeTableName: true,
    underscored: true,
    underscoredAll: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true,
  },
  timezone: "+07:00",
  logging: (a, b, c) => {
    console.log(a);
  },

  operatorsAliases: 0,
});
const authenticate = async () => {
  try {
    await db.authenticate();
    console.log("_Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

authenticate();
var models = {};

fs.readdirSync(__dirname + "/generated")
  .filter((filename) => filename !== "index.js")
  .forEach(function (filename) {
    let model = {};
    model.path = path.join(__dirname, "/generated", filename);
    model.name = filename;
    models[model.name] = require("./generated/" + filename)(db, Sequelize);
  });

db.Sequelize = Sequelize;
export default db;

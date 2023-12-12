import { Sequelize } from "sequelize";

const sequelize = new Sequelize("test", "root", "", {
  dialect: "mysql",
  define: {
    charset: "UTF8",
    collate: "UTF8_GENERAL_CI",
  },
});

export default sequelize;

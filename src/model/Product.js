import { Model, DataTypes } from "sequelize";
import sequelize from "../utility/Connection.js";
import { Category } from "./Category.js";

export class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.SMALLINT,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    tableName: "products",
  },
);

Product.belongsTo(Category);
Category.hasMany(Product);
import cors from "cors";
import parser from "body-parser";
import { Sequelize, DataTypes, Model } from "sequelize";
import express from "express";

const app = express();
const { json, urlencoded } = parser;
const port = 3000;

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());

// Cấu hình kết nối cơ sở dữ liệu
const sequelize = new Sequelize("nodejs", "postgres", "1", {
    host: "localhost",
    dialect: "postgres",
    define: {
        charset: "UTF8",
        collate: "UTF8_UNICODE_CI",
        timestamps: false,
        freezeTableName: true
    },
    logging: console.log
});

// Đánh dấu lớp này là một model ( một bảng của cơ sở dữ liệu )
class Product extends Model { }

Product.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    }
}, { sequelize });

(async () => {
    await sequelize.sync({ alter: true }); // CREATE TABLE ...
})();

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});


// API

app.get("/", async (req, res) => {
    try {
        res.send(await Product.findAll()).status(200);
    } catch (error) {
        res.send(error);
    }
});

app.post("/", async (req, res) => {
    try {
        const prod = Product.build({
            name: req.body.name
        });
        await prod.save();
        res.status(201).json();
    } catch (error) {
        res.send(error);
    }
});

app.put("/test/:id", async (req, res) => {
    try {
        const current = await Product.findByPk(req.params.id);
        const newer = await current.update({
            name: req.body.name
        });
        res.send(newer).status(200);
    } catch (error) {
        res.send(error);
    }
});

app.delete("/test/:id", async (req, res) => {
    try {
        await Product.destroy({
            where: {
                id: req.params.id
            }
        });
        res.send("Deleted!").status(204);
    } catch (error) {
        res.send(error);
    }
});
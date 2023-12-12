import express from "express";
import { Product } from "../model/Product.js";

const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    res.json(await Product.findAll()).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/products", async (req, res) => {
  try {
    const { name, price, categoryId } = req.body;
    const product = await Product.create({ name, price, categoryId });
    res.json(product).status(201);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/products/:id", async (req, res) => {
  try {
    const { name, price, categoryId } = req.body;
    const { id } = req.params;
    const newer = await Product.update(
      {
        name: name,
        price: price,
        categoryId: categoryId,
      },
      {
        where: {
          id: id,
        },
      },
    );

    res.send(newer).status(200);
  } catch (error) {
    console.error(error);
  }
});

router.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Product.destroy({ where: { id } });
    res.json({ message: "Product deleted successfully!" }).status(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



export default router;

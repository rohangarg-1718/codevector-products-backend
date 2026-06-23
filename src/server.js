const express = require("express");
const cors = require("cors");
const prisma = require("./prisma");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "CodeVector Products Backend is running",
    endpoints: {
      products: "/products",
      health: "/health"
    }
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/products", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const category = req.query.category;
    const cursor = req.query.cursor;

    const where = {};

    if (category) {
      where.category = category;
    }

    const queryOptions = {
      where,
      take: limit,
      orderBy: [
        { createdAt: "desc" },
        { id: "desc" }
      ]
    };

    if (cursor) {
      queryOptions.cursor = {
        id: cursor
      };

      queryOptions.skip = 1;
    }

    const products = await prisma.product.findMany(queryOptions);

    const nextCursor =
      products.length === limit
        ? products[products.length - 1].id
        : null;

    res.json({
      count: products.length,
      nextCursor,
      products
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong"
    });
  }
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
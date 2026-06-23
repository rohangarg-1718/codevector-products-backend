const prisma = require("../src/prisma");

const categories = [
  "Electronics",
  "Books",
  "Fashion",
  "Home",
  "Sports",
  "Beauty",
  "Toys",
  "Groceries"
];

async function main() {
  const BATCH_SIZE = 5000;
  const TOTAL = 200000;

  console.log("Starting seed...");

  for (let i = 0; i < TOTAL; i += BATCH_SIZE) {
    const products = [];

    for (let j = 0; j < BATCH_SIZE; j++) {
      const productNumber = i + j + 1;

      products.push({
        name: `Product ${productNumber}`,
        category:
          categories[
            Math.floor(Math.random() * categories.length)
          ],
        price: Number(
          (Math.random() * 5000 + 100).toFixed(2)
        )
      });
    }

    await prisma.product.createMany({
      data: products
    });

    console.log(
      `${Math.min(i + BATCH_SIZE, TOTAL)} products inserted`
    );
  }

  console.log("Seed completed");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
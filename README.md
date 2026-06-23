# CodeVector Backend Assignment

## Live Demo

https://codevector-products-backend-n2uk.onrender.com

## Tech Stack

* Node.js
* Express.js
* PostgreSQL (Neon)
* Prisma ORM

## Features

* Browse 200,000 products
* Category filtering
* Cursor-based pagination
* Fast database queries with indexing
* REST API

## API Endpoints

### Health Check

GET /health

### Get Products

GET /products

### Get Products with Limit

GET /products?limit=20

### Filter by Category

GET /products?category=Electronics&limit=20

### Pagination

GET /products?limit=20&cursor=<cursor>

## Database Schema

Products table contains:

* id
* name
* category
* price
* created_at
* updated_at

## Seeding

Generate 200,000 products:

```bash
npm run seed
```

The seed script uses batched inserts for better performance.

## Why Cursor Pagination?

Offset pagination can become slow on large datasets and may result in duplicate or skipped records when data changes.

Cursor-based pagination provides:

* Better performance
* Consistent results
* Improved scalability

## Setup

Install dependencies:

```bash
npm install
```

Create environment file:

```env
DATABASE_URL=your_neon_database_url
```

Run server:

```bash
npm start
```

## Future Improvements

* Composite cursor (createdAt + id)
* Redis caching
* Swagger API documentation
* Rate limiting

## AI Usage

AI was used for brainstorming architecture, validating pagination approaches, and accelerating implementation. All code was manually reviewed, tested, and debugged before deployment.

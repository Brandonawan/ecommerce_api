const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const { MongoMemoryServer } = require('mongodb-memory-server');

const  url = 'http://localhost:3000';
const productSchema = require('./models/productSchema');

const Product = mongoose.model('Product', productSchema);

const app = express();

// Apply rate limiting middleware
const limiter = rateLimit({
  windowMs: 60000, // 1 minute
  max: 5, // Maximum 5 requests per minute
});
app.use(limiter);

// ... Define routes and other middleware ...

describe('Product API', () => {
  let mongod;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });

  describe('Database connection', () => {
    test('should successfully connect to the database', async () => {
      const connectionState = mongoose.connection.readyState;
      expect(connectionState).toBe(1); // 1 means connected
    });
  });

  describe('GET /products', () => {
    test('should get all products', async () => {
      const response = await request(url).get('/products');
      expect(response.status).toBe(200);
      // Add more assertions based on the response structure and expected data
    });
  });

  describe('Rate Limits', () => {
    test('should enforce rate limits', async () => {
      // Send 5 requests within 1 minute
      for (let i = 0; i < 5; i++) {
        await request(url).get('/products');
      }

      // The 6th request should exceed the rate limit
      const response = await request(app).get('/products');
      expect(response.status).toBe(429); // 429 indicates Too Many Requests
      expect(response.body.error).toBe('Too many requests, please try again later');
    });
  });
});




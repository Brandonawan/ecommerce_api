const request = require('supertest');
const app = require('./app');
const mongoose = require('mongoose');

// Mock Product data
const productData = [
  { name: 'Product 1', price: 9.99 },
  { name: 'Product 2', price: 19.99 },
];

// Set up a temporary test database
beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/eccomerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

const productSchema = require('./models/productSchema');

const Product = mongoose.model('Product', productSchema);
// Seed the test database with Product data
beforeEach(async () => {
  await Product.insertMany(productData);
});

// Clear the test database after each test
afterEach(async () => {
  await Product.deleteMany();
});

// Close the MongoDB connection after all tests are done
afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET /products', () => {
  test('should get all products', async () => {
    const response = await request(app).get('/products');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(productData.length);
    expect(response.body[0].name).toBe(productData[0].name);
    expect(response.body[0].price).toBe(productData[0].price);
    // Add more assertions as needed
  });
});

describe('POST /products', () => {
  test('should create a new product', async () => {
    const newProduct = { name: 'New Product', price: 29.99 };
    const response = await request(app)
      .post('/products')
      .send(newProduct);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newProduct.name);
    expect(response.body.price).toBe(newProduct.price);
    // Add more assertions as needed
  });
});

// describe('GET /products/:id', () => {
//   test('should get a single product', async () => {
//     const product = await Product.findOne();
//     const response = await request(app).get(`/products/${product._id}`);
//     expect(response.status).toBe(200);
//     expect(response.body.name).toBe(product.name);
//     expect(response.body.price).toBe(product.price);
//     // Add more assertions as needed
//   });

//   test('should return 404 if product not found', async () => {
//     const invalidProductId = 'non-existent-id';
//     const response = await request(app).get(`/products/${invalidProductId}`);
//     expect(response.status).toBe(404);
//     expect(response.body.error).toBe('Product not found');
//   });
// });

// describe('PUT /products/:id', () => {
//   test('should update a product', async () => {
//     const product = await Product.findOne();
//     const updatedProduct = { name: 'Updated Product', price: 39.99 };
//     const response = await request(app)
//       .put(`/products/${product._id}`)
//       .send(updatedProduct);
//     expect(response.status).toBe(200);
//     expect(response.body.name).toBe(updatedProduct.name);
//     expect(response.body.price).toBe(updatedProduct.price);
//     // Add more assertions as needed
//   });

//   test('should return 404 if product not found', async () => {
//     const invalidProductId = 'non-existent-id';
//     const response = await request(app)
//       .put(`/products/${invalidProductId}`)
//       .send({ name: 'Updated Product', price: 39.99 });
//     expect(response.status).toBe(404);
//     expect(response.body.error).toBe('Product not found');
//   });
// });

// describe('DELETE /products/:id', () => {
//   test('should delete a product', async () => {
//     const product = await Product.findOne();
//     const response = await request(app).delete(`/products/${product._id}`);
//     expect(response.status).toBe(200);
//     expect(response.body._id).toBe(product._id.toString());
//     // Add more assertions as needed
//   });

//   test('should return 404 if product not found', async () => {
//     const invalidProductId = 'non-existent-id';
//     const response = await request(app).delete(`/products/${invalidProductId}`);
//     expect(response.status).toBe(404);
//     expect(response.body.error).toBe('Product not found');
//   });
// });

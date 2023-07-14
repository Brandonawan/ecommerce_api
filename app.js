// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');

// app.use(express.json());

// const productSchema = require('./models/productSchema');

// const Product = mongoose.model('Product', productSchema);

// // List Products
// app.get('/products', async (req, res) => {
//   try {
//     const products = await Product.find({});
//     res.json(products);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to retrieve products' });
//   }
// });

// // Create a Product
// app.post('/products', async (req, res) => {
//   try {
//     const { name, price } = req.body;
//     const product = await Product.create({ name, price });
//     res.status(201).json(product);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to create product' });
//   }
// });

// // Get a Product
// app.get('/products/:id', async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const product = await Product.findById(productId);
//     if (product) {
//       res.json(product);
//     } else {
//       res.status(404).json({ error: 'Product not found' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to retrieve product' });
//   }
// });

// // Update a Product
// app.put('/products/:id', async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const { name, price } = req.body;
//     const product = await Product.findByIdAndUpdate(
//       productId,
//       { name, price },
//       { new: true }
//     );
//     if (product) {
//       res.json(product);
//     } else {
//       res.status(404).json({ error: 'Product not found' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to update product' });
//   }
// });

// // Delete a Product
// app.delete('/products/:id', async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const product = await Product.findByIdAndDelete(productId);
//     if (product) {
//       res.json(product);
//     } else {
//       res.status(404).json({ error: 'Product not found' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to delete product' });
//   }
// });

// // Start the server
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { ValidationError } = require('express-validation');


// Initialize the Express app
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });

// Product schema and model
const productSchema = require('./models/productSchema');

const Product = mongoose.model('Product', productSchema);

// List Products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
});

// Create a Product
app.post('/products', async (req, res) => {
  try {
    const { name, price } = req.body;
    const product = await Product.create({ name, price });
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Get a Product
app.get('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve product' });
  }
});

// Update a Product
app.put('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, price } = req.body;
    const product = await Product.findByIdAndUpdate(
      productId,
      { name, price },
      { new: true }
    );
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete a Product
app.delete('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Error handling for validation errors
app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(err.statusCode).json({ error: err.details.body });
  } else {
    next(err);
  }
});

// Error handling for general errors
app.use((err, req, res) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

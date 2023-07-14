# E-commerce Application

Welcome to the E-commerce Application! This application provides functionalities for managing products.

## Getting Started

To test the application, follow the steps below:

1. Access the Application
   - Open your web browser and navigate to the deployed URL or endpoint.
   - Example: `https://ecommerceapi-production-38f0.up.railway.app/products/`

2. List Products
   - Navigate to the `/products` endpoint of the application.
   - Example: `https://ecommerceapi-production-38f0.up.railway.app/products/`
   - You should see a list of products displayed.

3. Create a Product
   - Use an API testing tool like Postman or cURL (`curl -X POST -H "Content-Type: application/json" -d '{"name": "Macbook", "price": 30.99}' https://ecommerceapi-production-38f0.up.railway.app/products/`).
   
   - Send a POST request to the `/products` endpoint with the required parameters (name and price) in the request body.
   - Provide a unique name and a price for the product.
   - Upon successful creation, the API will respond with a 201 status code and the created product details.

4. Get a Product
   - Navigate to the `/products/{id}` endpoint, replacing `{id}` with the ID of an existing product.
   - Example: `https://ecommerceapi-production-38f0.up.railway.app/products/64b1749d58447948e75a2d6c`
   - You should see the details of the specific product displayed.

5. Update a Product
   - Use an API testing tool to make a PUT request to the `/products/{id}` endpoint, replacing `{id}` with the ID of an existing product.
   - Provide the updated name and price in the request body.
   - Upon successful update, the API will respond with the updated product details.

6. Delete a Product
   - Use an API testing tool to make a DELETE request to the `/products/{id}` endpoint, replacing `{id}` with the ID of an existing product.
   - Upon successful deletion, the API will respond with the deleted product details.

7. Error Handling
   - Observe the error responses when performing actions like providing invalid input or accessing non-existent endpoints.
   - The application should handle errors gracefully.

8. Validation Errors
   - Test validation errors by attempting to create or update a product with missing or invalid data.
   - Observe the appropriate validation error responses from the API.

9. General Errors
   - Trigger a general error intentionally, such as causing an unexpected exception in the application.
   - Observe that the API responds with a 500 status code and an "Internal server error" message.

10. Overall Testing
    - Thoroughly test different scenarios, such as creating multiple products, updating and deleting existing products, and handling edge cases.
    - Ensure that the application behaves as expected.

Feel free to explore and test the various functionalities of the E-commerce Application. Enjoy!


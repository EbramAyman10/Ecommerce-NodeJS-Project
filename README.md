# 🛒 E-Commerce Backend API

A RESTful e-commerce backend API built with **Node.js, Express.js, and MongoDB**.

This project provides the backend functionality for a complete e-commerce system, including authentication, product management, reviews, cart, wishlist, coupons, orders, image uploads, and online payments with Stripe.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- User signup and signin
- JWT-based authentication
- Role-based authorization
- Password hashing with bcrypt
- Email verification using OTP
- Change password functionality
- Protected routes

### 📦 Product Management
- Product CRUD operations
- Category and subcategory management
- Brand management
- Product image uploads
- Image validation and file size limits
- Product filtering
- Sorting
- Searching
- Field selection
- Pagination

### ⭐ Reviews & Ratings
- Create, update, and delete reviews
- One review per user per product
- Authentication and authorization for reviews
- Product ratings and reviews

### 🛍️ Shopping Cart
- Create and manage user carts
- Add products to cart
- Update product quantities
- Remove cart items
- Calculate total cart price
- Apply coupons
- Clear cart

### ❤️ Wishlist & Addresses
- Add and remove products from wishlist
- Manage user addresses

### 🎟️ Coupons
- Coupon CRUD operations
- Apply coupons to carts
- Discount calculation

### 📦 Orders
- Create cash orders
- Create online payment orders
- Get user orders
- Get all orders for administrators
- Update product stock
- Increment sold products
- Clear cart after successful order creation

### 💳 Stripe Payments
- Stripe Checkout integration
- Checkout session creation
- Stripe webhook integration
- Webhook signature verification
- Create orders after successful payment

### 🖼️ File Upload
- Image uploads using Multer
- File type validation
- File size limits
- Single and multiple file uploads
- Store file names/paths instead of image data in MongoDB

### ⚙️ API & Backend Architecture
- RESTful API architecture
- Centralized error handling
- Custom application errors
- Async error handling
- Request validation using Joi
- Reusable API features
- Service layer for business logic
- Environment variables for sensitive configuration

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JWT |
| Password Hashing | bcrypt |
| Validation | Joi |
| File Upload | Multer |
| Payments | Stripe |
| API Testing | Postman |
| Version Control | Git, GitHub |

---

## 📁 Project Structure

```text
E-Commerce-Backend/
│
├── database/
│   ├── models/
│   │   ├── brand.model.js
│   │   ├── cart.model.js
│   │   ├── category.model.js
│   │   ├── coupon.model.js
│   │   ├── order.model.js
│   │   ├── product.model.js
│   │   ├── review.model.js
│   │   ├── subCategory.model.js
│   │   └── users.model.js
│   │
│   └── dbConnection.js
│
├── src/
│   ├── fileUpload/
│   │   └── fileUpload.js
│   │
│   ├── handlers/
│   │   └── handlers.js
│   │
│   ├── middleware/
│   │   ├── catchError.js
│   │   ├── checkEmail.js
│   │   ├── globalError.js
│   │   └── validate.js
│   │
│   ├── modules/
│   │   ├── address/
│   │   ├── auth/
│   │   ├── brand/
│   │   ├── cart/
│   │   ├── category/
│   │   ├── coupon/
│   │   ├── order/
│   │   ├── products/
│   │   ├── review/
│   │   ├── subCategory/
│   │   ├── user/
│   │   └── wishlist/
│   │
│   ├── service/
│   │   └── orderService.js
│   │
│   └── utils/
│       ├── apiFeatures.js
│       ├── appError.js
│       └── deleteImages.js
│
├── uploads/
│   ├── brands/
│   ├── categories/
│   └── products/
│
├── .env
├── .gitignore
├── index.js
└── package.json
```

---

## 🔑 Authentication

The API uses **JWT** to authenticate users.

Protected endpoints require a valid token in the request headers:

```text
Authorization: Bearer <token>
```

Authorization is handled separately from authentication:

- **Authentication** verifies the user's identity.
- **Authorization** determines what the authenticated user is allowed to do.

---

## 🔎 API Features

The API includes reusable query features through an API Features class.

### Filtering

Filter products using specific fields and values.

Example:

```text
/products?price[gte]=5000
```

### Sorting

Sort results by one or multiple fields.

Example:

```text
/products?sort=-price
```

### Searching

Search products using regular expressions.

Example:

```text
/products?search=laptop
```

### Field Selection

Return only the fields required by the client.

Example:

```text
/products?fields=name,price
```

### Pagination

Results are divided into pages to avoid returning a large number of documents in a single response.

Example:

```text
/products?page=2&limit=20
```

---

## 🖼️ Image Uploads

Images are handled using **Multer**.

The upload system supports:

- Image type filtering
- File size limits
- Single file uploads
- Multiple file uploads
- Separate upload directories
- Storing image file names instead of raw image data in MongoDB

Image paths are converted into accessible URLs when returned through the API.

---

## 💳 Payment Flow

The project supports both **cash orders** and **online payments**.

### Cash Order

```text
Client
  ↓
Create Order API
  ↓
Validate Cart
  ↓
Create Order
  ↓
Update Product Stock & Sold
  ↓
Clear Cart
  ↓
Return Order
```

### Stripe Order

```text
Client
  ↓
Create Checkout Session
  ↓
Stripe Checkout
  ↓
Customer Completes Payment
  ↓
Stripe Webhook
  ↓
Verify Webhook Signature
  ↓
Create Order
  ↓
Update Product Stock & Sold
  ↓
Clear Cart
```

The webhook is used as the trusted backend confirmation that the payment was successfully completed.

---

## 🌐 API Documentation

The complete API documentation is available through **Postman**.

The documentation contains the available endpoints, HTTP methods, request parameters, request bodies, authentication requirements, and example responses.

### 📮 Postman Documentation

**[View API Documentation](YOUR_POSTMAN_DOCUMENTATION_LINK)**

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the project

```bash
cd YOUR_PROJECT_FOLDER
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root and add the required environment variables.

```env
PORT=3000
DB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

STRIPE_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SIGNING=your_stripe_webhook_secret
```

> ⚠️ Never commit your `.env` file or any secret keys to GitHub.

### 5. Run the project

```bash
npm start
```

For development:

```bash
npm run dev
```

---

## ☁️ Deployment

The backend is deployed using **Vercel** and the production database is hosted on **MongoDB Atlas**.

### Live API

**[Open Live API](YOUR_VERCEL_URL)**

### API Documentation

**[Open Postman Documentation](YOUR_POSTMAN_DOCUMENTATION_LINK)**

---

## 🧪 Testing

The API was tested using **Postman**.

The Postman collection covers the main application flows, including:

- Authentication
- Users
- Categories
- Subcategories
- Brands
- Products
- Reviews
- Wishlist
- Addresses
- Coupons
- Cart
- Orders
- Stripe payment flow

---

## 🧠 Architecture & Code Organization

The project separates responsibilities between different layers:

- **Controllers** handle HTTP requests and responses.
- **Middleware** handles cross-cutting request logic such as authentication, authorization, validation, and error handling.
- **Services** contain reusable business logic that can be shared between different controllers or flows.
- **Models** define the MongoDB data structure and database behavior.
- **Utilities** contain reusable functionality such as API features and application errors.

This structure helps keep controllers focused on handling requests while moving reusable business logic into appropriate layers.

---

## 👨‍💻 Author

### Ebram Ayman

Computer Science Student | Backend / Full-Stack Developer

- 💻 GitHub: https://github.com/EbramAyman10
- 💼 LinkedIn: https://www.linkedin.com/in/ebram-ayman-3082a92b2/

---

## 📌 Project Status

Completed backend e-commerce project covering the main features required for a modern RESTful e-commerce API.


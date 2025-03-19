# E-Commerce Platform

**BigBuy** is a feature-rich e-commerce platform built using the MERN stack (MongoDB, Express.js, React, Node.js), designed for efficient product management, secure transactions, and a seamless shopping experience. This platform integrates several advanced technologies for payments, image storage, and data encryption, with a focus on optimizing performance and user experience.

## Features

- **MERN Stack**: Utilizes MongoDB, Express.js, React, and Node.js for building a scalable and maintainable web application.
- **Global State Management**: Integrated **Context API** for efficient global data management, ensuring smooth and consistent state across components.
- **Admin Panel**: Provides an easy-to-use admin interface for managing products, categories, orders, and users.
- **Optimized UI**: Designed to deliver a clean, responsive, and fast user interface.
- **Optimistic UI Updates**: Implemented for enhanced user satisfaction.
- **Stripe Integration**: Secure payment gateway integration using **Stripe**, ensuring safe and encrypted transactions.
- **Cloudinary**: Integrated with **Cloudinary** for optimized image upload and storage, ensuring fast image delivery and better user experience.

     >> Go Live: [LIVE VIEW](https://buzz-buy.vercel.app/)


## Tech Stack

- **Frontend**: React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Payment**: Stripe
- **Image Storage**: Cloudinary


## Test Users

- **USER**
  - Email: test@test.com
  - Password: test123

- **ADMIN**
  - Email: seller@buzzbuy.com
  - Password: admin123

## Setup Instructions

### Prerequisites

Make sure you have the following installed:

- Node.js (v14.x or above)
- MongoDB (local instance or Atlas)
- Stripe account for payments
- Cloudinary account for image storage

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/raghabendra-dash/MERN-Ecommerce.git
   cd BigBuy
   ```

2. Install dependencies for both frontend and backend:

   ```bash
   cd client
   npm install

   cd ../backend
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the `/client` directory and include the following:

   ```env
   VITE_API=http://localhost:8080
   VITE_STRIPE_PUBLISH_KEY=YOUR_STRIPE_PUBLISH_KEY
   VITE_STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY
   VITE_SERVER_URL=SERVER_BASE_URL_WITHOUT_TRAILING_SLASH (if you want to deploy server url- https://mern-ecom-backend-z8g2.onrender.com or https://e-commerce-mgtd.onrender.com )
   ```
   
   Create a `.env` file in the `/backend` directory and include the following:

   ```env
   PORT=8080
   MONGODB_URI=YOUR_MONGODB_BASE_URI/database_name
   JWT_SECRET=RANDOM_STRING
   CLOUD_NAME=CLOUDINARY_CLOUD_NAME
   CLOUD_API_KEY=CLOUDINARY_API_KEY
   CLOUD_SECRET=CLOUDINARY_SECRET_KEY
   STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY
   ```

4. Start the development servers:

   ```bash
   # Start the backend server
   cd backend
   npm run server

   # Start the frontend server
   cd client
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173` to view the app.

## Usage

- **User Side**: Browse products, add to cart, make payments securely using Stripe, view wishlisted items and view order history.
- **Admin Panel**: Manage products, orders, and users efficiently through the admin interface.
- **Image Upload**: Automatically upload product images to Cloudinary for optimized storage and delivery.

## Optimizations

- **Optimistic UI**: Implemented for a smoother user experience.
- **Performance Improvements**: Optimized API request handling and response times to efficiently manage 4000+ requests per month.
- **Responsive Design**: Fully responsive UI ensuring seamless experience across all devices.

## Contributions

Feel free to fork this repository and submit pull requests. All contributions are welcome!


**BigBuy** — The smart, efficient, and secure way to shop online.

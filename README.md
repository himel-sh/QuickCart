# 🛒 QuickCart — Your Modern E-commerce Platform

**QuickCart** is a fast, responsive, and secure e-commerce web application that allows users to browse products, manage carts, and place orders seamlessly.  
Built with Next.js and Clerk for authentication, QuickCart provides a modern shopping experience with a clean and intuitive interface.

---

### 🌐 **Live Site URL**


👉 [https://quick-cart-mu-hazel.vercel.app/](https://quick-cart-mu-hazel.vercel.app/)

---

### ✨ **Key Features**

- 🔐 **Authentication & User Management:** Secure login, registration, and user sessions powered by **Clerk**.
- 🛍️ **Product Management:** Sellers can add, update, and remove products. Customers can browse products by category.
- 🛒 **Cart System:** Add items to cart, adjust quantities, and calculate totals including tax.
- 🧾 **Order Placement & History:** Users can place orders with saved addresses and view their order history.
- 📦 **Order Management for Sellers:** Sellers can view and manage all orders for their products.
- 🌙 **Responsive Design:** Optimized for mobile, tablet, and desktop devices.
- 💬 **Notifications:** Real-time feedback using React Hot Toast for success and error messages.

---

### 💻 **Tech Stack**

- **Frontend Framework:** Next.js `^15.5.6`
- **React:** `^19.0.0`
- **Authentication:** Clerk (`@clerk/nextjs`, `@clerk/clerk-sdk-node`)
- **HTTP Client:** Axios `^1.13.2`
- **Database:** MongoDB with Mongoose `^9.0.0`
- **Serverless Functions / API Routes:** Next.js API routes
- **File Upload & Media:** Cloudinary `^2.8.0`
- **Workflow & Event Handling:** Inngest `^3.46.0`
- **Notifications:** React Hot Toast `^2.5.1`
- **TypeScript:** `^5.9.3`
- **Other Utilities:** SVix `^1.81.0`

---

### ⚡ **API Route Summary & Capabilities**

QuickCart provides the following backend functionalities via Next.js API routes:

#### **Product Management**
- **Add Product:** Sellers can add new products to the marketplace (`POST /api/product/create`).
- **Delete Product:** Sellers can remove their products by ID (`DELETE /api/product/delete?id=:id`).
- **View Product:** Retrieve details of a specific product (`GET /api/product/:id`).

#### **Order Management**
- **Place Order:** Authenticated users can place an order with selected items and saved addresses (`POST /api/order/create`).
- **User Order History:** Users can view all their past orders (`GET /api/order/list`).
- **Seller Orders:** Sellers can view all orders placed for their products (`GET /api/order/seller-orders`).

#### **User Management**
- **Fetch User Addresses:** Retrieve all saved addresses for the logged-in user (`GET /api/user/get-address`).
- **Add Address:** Add a new address to the user's profile (`POST /api/user/add-address`).

#### **Authentication & Authorization**
- **Handled via Clerk SDK:** Login, signup, session management, and protected routes (`/api/auth/*`).

#### **Notifications & Events**
- **Real-Time Notifications:** Using React Hot Toast for success/error messages.
- **Event Handling:** Order creation events are handled via Inngest for workflow automation.


### 🚀 **Setup & Installation**

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/quickcart.git
cd quickcart```


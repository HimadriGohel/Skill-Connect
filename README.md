# 🔍 Skill Connect

**Look for Worker** is a full-stack web application that connects customers with skilled workers like carpenters, painters, electricians, and more. Workers can register themselves on the platform and be hired on an hourly pay basis. The website offers user-friendly features for both workers and customers, including profile management, filters, support, and secure authentication.

---

## 🌟 Features

- 🏠 **Home Page**: Landing page with registration and sign-in popups for users and workers.
- 🛠️ **Worker Registration Form**: Workers can register by selecting their skill category and subcategory, and uploading profile images.
- 🔍 **Find Worker Page**: Customers can filter workers based on skill type, pay rate, and availability.
- 👤 **User Profile Page**: Customers can manage their profile and view their activity.
- 👷 **Worker Profile Page**: Workers can view their job progress and manage their availability.
- 🆘 **Support Page**: For general help and complaints.
- 🔐 **Secure Login & Registration**: Using JWT for session management and bcrypt for password hashing.
- ☁️ **Image Uploads**: Images are uploaded and stored using Cloudinary.

---

## 🧰 Tech Stack

### Frontend
- HTML
- CSS
- JavaScript
- Bootstrap
- ReactJS

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Other Tools
- Cloudinary – For image uploads
- JSON Web Token (JWT) – For secure authentication
- bcrypt – For password hashing

---

## 📸 Screenshots

## Home Page
![Screenshot 2025-05-28 210739](https://github.com/user-attachments/assets/2ec6381b-f5d8-4737-83d1-64fd42cc0f3f)

## Find Worker Page
![Screenshot 2025-05-28 211105](https://github.com/user-attachments/assets/8c7e18b0-a555-46ac-b6b2-1d89aab7d839)


## Worker Profile 
![Screenshot 2025-05-28 211007](https://github.com/user-attachments/assets/d4531ee5-1421-42fb-a625-dce589b49808)

## Register Form 
 ![Screenshot 2025-05-28 210801](https://github.com/user-attachments/assets/fa921a95-12d1-4d74-9d71-26d29ecc2e69)


---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/look-for-worker.git
cd look-for-worker
```
### 2. Install Dependencies
- cd backend
- npm install
- cd ../frontend
- npm install

## 🔐 Set Up Environment Variables
- Create a .env file in the backend/ folder and add the following:
- PORT=5000
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret
- CLOUDINARY_CLOUD_NAME=your_cloud_name
- CLOUDINARY_API_KEY=your_api_key
- CLOUDINARY_API_SECRET=your_api_secret

## 🧪 Running the App

- ▶️ Start Backend

- cd backend
- npm run dev

## ▶️ Start Frontend

- cd ../frontend
- npm run dev


# 🍽 Recipe Sharing Web App

A full-stack web application where users can explore, search, and share delicious recipes from around the world.

## 🚀 Features
* 🔍 Search recipes by name
* 🍲 Filter recipes by category (Kathiyawadi, South Indian, Fast Food, Punjabi)
* ➕ Add new recipes with image upload
* ❤️ Add recipes to favorites
* ⭐ User rating & reviews system
* 📂 Category-based browsing
* 📱 Responsive UI

## 🛠 Tech Stack

### Frontend
* ⚛️ React.js
* 🎨 CSS
* 🔗 React Router

### Backend
* 🟢 Node.js
* 🚀 Express.js

### Database
* 🐘 PostgreSQL


## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/recipe-app.git
cd recipe-app
```

### 2️⃣ Setup Backend

```bash
cd server
npm install
node index.js
```

### 3️⃣ Setup Frontend

```bash
cd client
npm install
npm run dev
```

## 🗄 Database Setup

Run these commands in PostgreSQL:

```sql
CREATE DATABASE recipes_db;

CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  name TEXT,
  ingredients TEXT,
  steps TEXT,
  time TEXT,
  image TEXT,
  category TEXT
);
```

## 📬 Contact

For any queries or suggestions, feel free to reach out!

## ⭐ Show Your Support

If you like this project, please give it a ⭐ on GitHub!

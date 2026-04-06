# Expense Tracker

A simple **full-stack Expense Tracker** project built with **HTML, CSS, JavaScript, Node.js, and MySQL**.  
It allows users to **register, login, add, view, edit, and delete expenses**. The UI is clean and responsive, providing a smooth user experience.

---

## Features

- User Registration & Login system  
- User authentication and logout  
- Add new expense (title/category + amount)  
- Edit or delete expenses  
- View total expense and total transactions  
- Responsive, modern dashboard UI  
- Data persistence with MySQL database  
- Clear error handling and validations  

---

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js, Express.js  
- **Database:** MySQL  
- **Other Libraries:** CORS  

---

## Installation & Setup

1. **Clone the repository**

git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker

2. **Install backend dependencies**
cd backend
npm install

3. **Configure MySQL Database**
Open MySQL (or phpMyAdmin/XAMPP)
Create a database named expense_tracker
Import the provided database.sql file if available, or create tables manually:

sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE expenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


4. **Run the backend server**
node server.js

## Project Structure
expense-tracker/
│
├─ backend/          # Node.js + Express server
│  ├─ server.js
│  ├─ routes/
│  ├─ controllers/
│  ├─ models/
│  └─ package.json
│
├─ frontend/         # HTML, CSS, JS frontend
│  ├─ index.html
│  ├─ dashboard.html
│  ├─ js/
│  └─ css/
│
└─ README.md



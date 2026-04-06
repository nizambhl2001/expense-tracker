const express = require('express');
const router = express.Router();
const db = require('./db');

// REGISTER
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    db.execute(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, password],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "User Registered" });
        }
    );
});

// LOGIN
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.execute(
        "SELECT * FROM users WHERE email=? AND password=?",
        [email, password],
        (err, result) => {
            if (err) return res.status(500).json(err);

            if (result.length > 0) {
                res.json(result[0]);
            } else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        }
    );
});

module.exports = router;
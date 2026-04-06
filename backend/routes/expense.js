const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE
router.post('/expense', (req, res) => {
    const { user_id, title, amount } = req.body;
    
    // Log the body to see if data is actually arriving
    console.log("Received data:", req.body); 

    db.execute(
        "INSERT INTO expenses (user_id, title, amount) VALUES (?, ?, ?)",
        [user_id, title, amount],
        (err, result) => {
            if (err) {
                console.error("SQL ERROR:", err); // <--- This will tell you exactly what's wrong
                return res.status(500).json(err);
            }
            res.json({ message: "Added" });
        }
    );
});
// READ
router.get('/expense/:id', (req, res) => {
    db.execute(
        "SELECT * FROM expenses WHERE user_id=?",
        [req.params.id],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json(result);
        }
    );
});

// UPDATE
router.put('/expense/:id', (req, res) => {
    const { title, amount } = req.body;
    const id = req.params.id;

    db.execute(
        "UPDATE expenses SET title=?, amount=? WHERE id=?",
        [title, amount, id],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Updated successfully" });
        }
    );
});

// DELETE
router.delete('/expense/:id', (req, res) => {
    const id = req.params.id;
    db.execute(
        "DELETE FROM expenses WHERE id=?",
        [id],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Deleted" });
        }
    );
});


module.exports = router;
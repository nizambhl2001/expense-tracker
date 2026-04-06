const express = require('express');
const path = require('path');
const open = (...args) => import('open').then(m => m.default(...args));

const app = express();
const PORT = 3000;

app.use(express.json());

// frontend serve
app.use(express.static(path.join(__dirname, '../frontend')));

// default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// start server
app.listen(PORT, () => {
    console.log(`Server running: http://localhost:${PORT}`);

    // browser auto open
    open(`http://localhost:${PORT}`);
});

const authRoutes = require('./auth');
app.use('/api', authRoutes);


const expenseRoutes = require('./routes/expense'); // backend route
app.use('/api', expenseRoutes);

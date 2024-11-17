const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoutes');
const foodItemRoutes = require("./routes/foodItemRoutes");

dotenv.config();


const app = express();
app.use(bodyParser.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(cors({
    origin: 'http://localhost:3000', // Only allow this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow only GET and POST methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow these headers
}));

app.use('/api/auth', authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/foods", foodItemRoutes);

// Serve static files from public/
app.use(express.static(path.join(__dirname, 'public')));

app.get('/service-worker.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'public', 'service-worker.js'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

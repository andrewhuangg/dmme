const express = require('express');
const cors = require('cors');
require('dotenv').config();

// * LOAD ROUTE files;
const authRoutes = require('./routes/auth');

const app = express();

// * MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!...');
});

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

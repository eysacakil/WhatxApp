const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
// .env dosyasındaki değişkenleri kullanabilmek için dotenv paketi import edildi
require('dotenv').config();

// Express uygulaması oluşturuldu
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors(
  {
    origin: 'http://localhost:3000', // Frontend'in çalıştığı port
    credentials: true,
  }
));

// MongoDB connection
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
// .env dosyasındaki değişkenleri kullanabilmek için dotenv paketi import edildi
require("dotenv").config();

// Express uygulaması oluşturuldu
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend'in çalıştığı port
    credentials: true,
  })
);

// MongoDB connection
const uri =
  "mongodb+srv://whatxappdb:NpcjzmzOB4gYW0YK@cluster0.7hnbbup.mongodb.net/";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const messageRoutes = require("./routes/messageRoutes");

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

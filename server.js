const express = require("express");
const logger = require("./src/middleware/logger");
const taskRoutes = require("./src/routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Gelen JSON body'lerini parse etmek için
app.use(express.json());

// Temel middleware: her isteği logla
app.use(logger);

// Ana sağlık kontrolü ucu
app.get("/", (req, res) => {
  res.status(200).json({ message: "TaskFlow API çalışıyor." });
});

// Görev yönetimi route'ları
app.use("/tasks", taskRoutes);

// Tanımsız route'lar için 404
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint bulunamadı." });
});

app.listen(PORT, () => {
  console.log(`TaskFlow API http://localhost:${PORT} adresinde çalışıyor.`);
});

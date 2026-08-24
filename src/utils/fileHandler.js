const fs = require("fs");
const path = require("path");

// Görevlerin kalıcı olarak tutulduğu JSON dosyasının yolu.
const DATA_FILE = path.join(__dirname, "..", "data", "tasks.json");

/**
 * tasks.json dosyasındaki tüm görevleri okur.
 * Dosya yoksa veya bozuksa boş dizi döner.
 */
function readTasks() {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw || "[]");
  } catch (err) {
    return [];
  }
}

/**
 * Verilen görev dizisini tasks.json dosyasına yazar.
 */
function writeTasks(tasks) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2), "utf-8");
}

module.exports = { readTasks, writeTasks };

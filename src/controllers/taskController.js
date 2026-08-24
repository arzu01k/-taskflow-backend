const { randomUUID } = require("crypto");
const { readTasks, writeTasks } = require("../utils/fileHandler");

// GET /tasks - Tüm görevleri listele
function getAllTasks(req, res) {
  const tasks = readTasks();
  res.status(200).json(tasks);
}

// GET /tasks/:id - Belirli bir görevin detayını getir
function getTaskById(req, res) {
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Görev bulunamadı." });
  }

  res.status(200).json(task);
}

// POST /tasks - Yeni görev oluştur
function createTask(req, res) {
  const { title, description, priority, assignee, status } = req.body;

  if (!title) {
    return res.status(400).json({ message: "'title' alanı zorunludur." });
  }

  const tasks = readTasks();
  const now = new Date().toISOString();

  const newTask = {
    id: randomUUID(),
    title,
    description: description || "",
    status: status || "pending",
    priority: priority || "medium",
    assignee: assignee || null,
    createdAt: now,
    updatedAt: now,
  };

  tasks.push(newTask);
  writeTasks(tasks);

  res.status(201).json(newTask);
}

// PUT /tasks/:id - Görev güncelle
function updateTask(req, res) {
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Görev bulunamadı." });
  }

  const { title, description, status, priority, assignee } = req.body;
  const existing = tasks[index];

  tasks[index] = {
    ...existing,
    title: title !== undefined ? title : existing.title,
    description: description !== undefined ? description : existing.description,
    status: status !== undefined ? status : existing.status,
    priority: priority !== undefined ? priority : existing.priority,
    assignee: assignee !== undefined ? assignee : existing.assignee,
    updatedAt: new Date().toISOString(),
  };

  writeTasks(tasks);
  res.status(200).json(tasks[index]);
}

// DELETE /tasks/:id - Görev sil
function deleteTask(req, res) {
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Görev bulunamadı." });
  }

  const [deleted] = tasks.splice(index, 1);
  writeTasks(tasks);

  res.status(200).json({ message: "Görev silindi.", task: deleted });
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};

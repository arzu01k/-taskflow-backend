const fs = require("fs");
const path = require("path");

const LOG_FILE = path.join(__dirname, "..", "..", "requests.log");

/**
 * Temel Logger Middleware
 * Her API isteğinin method, endpoint ve zaman damgasını
 * hem konsola hem de requests.log dosyasına kaydeder.
 */
function logger(req, res, next) {
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] ${req.method} ${req.originalUrl}`;

  console.log(logLine);

  fs.appendFile(LOG_FILE, logLine + "\n", (err) => {
    if (err) console.error("Log dosyasına yazılamadı:", err.message);
  });

  next();
}

module.exports = logger;

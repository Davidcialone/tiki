// logger.js
import winston from "winston";

const logger = winston.createLogger({
  level: "info", // Niveau de logs : 'error', 'warn', 'info', 'verbose', 'debug', 'silly'
  format: winston.format.combine(
    winston.format.colorize(), // Ajoute la couleur au log en fonction du niveau
    winston.format.timestamp(), // Ajoute une date/time à chaque log
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // Logs visibles dans la console
    new winston.transports.File({ filename: "logs/combined.log" }), // Logs écrits dans un fichier
  ],
});

export default logger;

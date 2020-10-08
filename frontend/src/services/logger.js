import winston from "winston";

const logger = new winston.createLogger({
  transports: [
    new winston.transports.Console({
      colorize: true,
      level: process.env.LOG_LEVEL,
      timestamp: Date.now(),
    }),
  ],
});

export default logger;

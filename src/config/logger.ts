import winston from 'winston';


const isProd = process.env.NODE_ENV === 'production';


export const logger = winston.createLogger({
level: isProd ? 'info' : 'debug',
format: winston.format.combine(
winston.format.timestamp(),
winston.format.json()
),
transports: [
new winston.transports.Console({
format: winston.format.combine(
winston.format.colorize(),
winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
winston.format.printf(({ level, message, timestamp, ...meta }) =>
`${timestamp} ${level}: ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`
)
)
}),
]
});
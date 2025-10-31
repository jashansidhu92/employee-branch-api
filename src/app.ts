import express from 'express';
import morgan from 'morgan';
import { errorHandler, notFound } from './middleware/error.middleware.js';
import loansRoutes from './api/v1/routes/loans.routes.js';
import adminRoutes from './api/v1/routes/admin.routes.js';


export function createApp() {
const app = express();
app.use(express.json());
app.use(morgan('dev'));


app.get('/health', (_req, res) => res.json({ status: 'ok' }));


app.use('/api/v1/loans', loansRoutes);
app.use('/api/v1/admin', adminRoutes);


app.use(notFound);
app.use(errorHandler);
return app;
}
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import 'colors';
import cors from 'cors';
import { json } from 'body-parser';
import SBRouter from './Routes/SBRoutes';

const app = express();
const PORT = process.env.PORT || 99;

app.use(json());
app.use(
	cors({
		origin: '*',
	})
);
app.use('/api', SBRouter);
app.use('/*', (req, res) => {
	res.status(404).json({
		error: 'This path does not exist',
	});
});

app.listen(PORT, () => {
	console.log(`listening on http://localhost:${PORT}`.bgGreen.bold);
});

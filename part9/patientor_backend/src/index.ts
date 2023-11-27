import express from 'express';
import cors from 'cors';
import diagnosisRouter from './routes/diagnosisRouter';

const app = express();
app.use(cors());

app.use('/api/diagnoses', diagnosisRouter);

const PORT = 3001;

app.listen(PORT, () => {
	console.log(`App can be assessed from http://localhost:${PORT}`);
});

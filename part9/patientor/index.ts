import express from 'express';

const app = express();

app.get('/api/ping', (_req, res) => {
	res.send('pong');
});

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`App can be assessed from http://localhost:${PORT}`);
});

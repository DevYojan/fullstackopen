import express from 'express';

const app = express();

app.get('/hello', (_req, res) => {
	res.send('Hello fullstack');
});

const PORT = '3005';

app.listen(PORT, () => console.log(`App is running on PORT ${PORT}`));

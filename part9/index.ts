import express from 'express';
import calculateBmi from './bmiCalculator';

const app = express();

app.get('/bmi', (req, res) => {
	if (Object.keys(req.query).length > 2 || Object.keys(req.query).length < 2) {
		res.send({ error: 'malformatted parameters' });
	}

	const { height, weight } = req.query;

	if (
		height === undefined ||
		weight === undefined ||
		isNaN(Number(height)) ||
		isNaN(Number(weight))
	) {
		res.send({ error: 'malformatted parameters' });
	}

	const bmiMessage = calculateBmi(Number(height), Number(weight));
	res.send({
		weight,
		height,
		bmiMessage,
	});
});

const PORT = '3005';

app.listen(PORT, () => console.log(`App is running on PORT ${PORT}`));

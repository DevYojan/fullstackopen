import express from 'express';
import calculateBmi from './bmiCalculator';
import { calculateExcercises } from './excerciseCalculator';

const app = express();
app.use(express.json());

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

app.post('/excercises', (req, res) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { daily_exercises, target } = req.body;

	if (!daily_exercises || !target || daily_exercises === '') {
		return res.send({ error: 'Invalid arguements' });
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
	daily_exercises.map((num: number) => {
		if (isNaN(Number(num))) {
			return res.send({ error: 'Invalid arguements' });
		}

		return Number(num);
	});

	if (isNaN(Number(target))) {
		return res.send({ error: 'Invalid arguements' });
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	const result = calculateExcercises(daily_exercises, target);
	return res.send(result);
});

const PORT = '3005';

app.listen(PORT, () => console.log(`App is running on PORT ${PORT}`));

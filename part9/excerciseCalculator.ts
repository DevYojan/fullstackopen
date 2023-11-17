import { parseExcerciseArgs } from './utils/helper';

interface Analysis {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

const calculateRating = (average: number, target: number): number => {
	const avgRating = target / average;
	const grossRating = avgRating / target;

	let rating = 1;

	if (grossRating >= 0.5) {
		rating = 1;
	} else if (grossRating >= 0.4 && grossRating < 0.5) {
		rating = 2;
	} else if (grossRating >= 0.3 && grossRating < 0.4) {
		rating = 3;
	} else if (grossRating >= 0.2 && grossRating < 0.3) {
		rating = 4;
	} else if (grossRating < 0.2) {
		rating = 5;
	}

	return rating;
};

const calculateRatingDescription = (rating: number): string => {
	switch (rating) {
		case 1:
			return 'Only improvement from here';

		case 2:
			return 'Try Hard';

		case 3:
			return 'A little bit more';

		case 4:
			return 'Good job!';

		case 5:
			return 'Excellento!';

		default:
			throw new Error('Oops something went wrong');
	}
};

const calculateExcercises = (
	trainingHours: number[],
	target: number
): Analysis => {
	const periodLength = trainingHours.length;
	const trainingDays = trainingHours.filter((num) => num > 0).length;
	const totalTrainingHours = trainingHours.reduce((a, b) => {
		return a + b;
	}, 0);

	const average = totalTrainingHours / periodLength;
	const rating = calculateRating(average, target);
	const ratingDescription = calculateRatingDescription(rating);

	return {
		periodLength,
		trainingDays,
		success: average >= target ? true : false,
		rating,
		ratingDescription,
		target,
		average,
	};
};

try {
	const { hours, target } = parseExcerciseArgs(process.argv);
	console.log(calculateExcercises(hours, target));
} catch (error: unknown) {
	let errorMessage = 'Something went wrong';

	if (error instanceof Error) {
		errorMessage += ' Error: ' + error.message;
	}

	console.log(errorMessage);
}

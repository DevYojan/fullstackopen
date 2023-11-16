const parseArgs = (args: string[]): number[] => {
	const height = args[2];
	const weight = args[3];

	if (args.length > 4) {
		throw new Error('Too many arguements');
	}

	if (args.length < 4) {
		throw new Error('Not Enough arguements');
	}

	if (isNaN(Number(weight)) || isNaN(Number(height))) {
		throw new Error('Invalid input');
	}

	return [Number(height), Number(weight)];
};

interface ExcerciseData {
	hours: number[];
	target: number;
}

const parseExcerciseArgs = (args: string[]): ExcerciseData => {
	if (args.length < 4) throw new Error('Not enough arguements');

	//Removing the first two arguements which are path string
	const numberArgs = args.slice(2).map((num) => {
		if (isNaN(Number(num))) {
			throw new Error('Invalid arguements');
		}

		return Number(num);
	});

	return {
		hours: numberArgs.slice(1),
		target: numberArgs[0],
	};
};

export { parseArgs, parseExcerciseArgs };

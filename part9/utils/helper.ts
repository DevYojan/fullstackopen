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

export { parseArgs };

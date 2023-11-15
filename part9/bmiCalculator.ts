const calculateBmi = (height: number, weight: number): string => {
	const BMI = weight / ((height / 100) * 2);

	let BmiMessage = '';

	if (BMI < 16.0) {
		BmiMessage = 'Underweight: Severe thinness';
	} else if (BMI >= 16.0 && BMI < 16.9) {
		BmiMessage = 'Underweight: Moderate thinness';
	} else if (BMI >= 17.0 && BMI < 18.4) {
		BmiMessage = 'Underweight: Mid thinness';
	} else if (BMI >= 18.5 && BMI < 24.9) {
		BmiMessage = 'Normal range';
	} else if (BMI >= 25.0 && BMI < 29.9) {
		BmiMessage = 'Overweight: Pre-obese';
	} else if (BMI >= 30.0 && BMI < 34.9) {
		BmiMessage = 'Overweight: Class I';
	} else if (BMI >= 35.0 && BMI < 39.9) {
		BmiMessage = 'Overweight: Class II';
	} else if (BMI >= 40.0) {
		BmiMessage = 'Overweight: Class III';
	}

	return BmiMessage;
};

console.log(calculateBmi(180, 74));

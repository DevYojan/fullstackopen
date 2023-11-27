import diagnosisData from '../data/diagnoses';
import { Diagnosis } from '../types';

const getAllDiagnoses = (): Diagnosis[] => {
	return diagnosisData;
};

export default { getAllDiagnoses };

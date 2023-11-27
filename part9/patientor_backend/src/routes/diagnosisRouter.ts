import express from 'express';
import diagnosisService from '../services/diagnosisService';

const router = express();

router.get('/', (_req, res) => {
	res.send(diagnosisService.getAllDiagnoses());
});

export default router;

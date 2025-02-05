import express, {Request, Response} from 'express';
import diagnosesService from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(diagnosesService.getDiagnoses());
});

router.get('/:code', (req: Request, res: Response) => {
    res.send(diagnosesService.getDiagnoseByCode(req.params.code));
});

export default router;
import express, {NextFunction, Request, Response} from 'express';
import patientsService from '../services/patientsService';
import {NewEntry, NewPatient, NonSensitivePatient} from '../types';
import {NewPatientSchema, toNewEntry} from '../utils';
import {z} from 'zod';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getPrivatePatients());
});

router.get('/:id', (req: Request, res: Response) => {
    res.send(patientsService.getPatientById(req.params.id));
});

router.post('/:id/entries', (req: Request, res: Response) => {
    const newEntry: NewEntry = toNewEntry(req.body);
    res.json(patientsService.addEntries(req.params.id, newEntry));
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        NewPatientSchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError)
        res.status(400).send({error: error.issues});
    else
        next(error);
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<NonSensitivePatient>) => {
    const addedPatient = patientsService.addPatient(req.body);

    res.json(addedPatient);
});

router.use(errorMiddleware);

export default router;
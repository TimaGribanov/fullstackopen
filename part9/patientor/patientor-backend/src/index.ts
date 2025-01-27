import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnosesRouter';
import patientsRouter from './routes/patientsRouter';

const app = express();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

const URI = '/api';

app.get(`${URI}/ping`, (_req, res) => {
    res.send('pong');
});

app.use(`${URI}/diagnoses`, diagnosesRouter);

app.use(`${URI}/patients`, patientsRouter);

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`The server started on port ${PORT}`);
});
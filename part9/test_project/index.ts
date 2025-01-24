import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hell Full Stack!');
});

app.get('/bmi', (req, res) => {
    if (req.query === undefined)
        res.send({
            error: "malformed parameters"
        });

    const height = parseInt(<string>req.query.height);
    const weight = parseInt(<string>req.query.weight);
    const bmi = calculateBmi(height, weight);

    res.send({
        height: height,
        weight: weight,
        bmi: bmi
    });
});

app.post('/exercise', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {daily_exercises, target} = req.body;

    console.log(typeof daily_exercises);

    if (!target || isNaN(Number(target)) || !daily_exercises || daily_exercises.length !== 7 || typeof daily_exercises === 'number')
        res.status(400).send('Malformed package');

    console.log(daily_exercises, target);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const parsedBody: Array<number> = [target, ...daily_exercises];

    res.send(calculateExercises(parsedBody));
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
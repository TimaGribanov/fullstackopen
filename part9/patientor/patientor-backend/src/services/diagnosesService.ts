import diagnosesData from '../data/diagnoses';
import {Diagnosis} from '../types';

const getDiagnoses = (): Diagnosis[] => {
    return diagnosesData;
};

const getDiagnoseByCode = (code: string): Diagnosis => {
    const foundDiagnosis: Diagnosis | undefined = diagnosesData.find(d => d.code === code);

    if (foundDiagnosis === undefined)
        throw Error('No diagnosis found with the code provided!');

    return foundDiagnosis;
};

export default { getDiagnoses, getDiagnoseByCode };
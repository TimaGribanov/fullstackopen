import {
    Diagnosis,
    Discharge,
    Gender,
    HealthCheckRating, NewBaseEntry,
    NewEntry,
    NewHealthCheckEntry, NewHospitalEntry,
    NewOccupationalHealthcareEntry,
    SickLeave
} from './types';
import {z} from 'zod';

export const NewPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
    entries: z.array(z.custom())
});

const isNumber = (value: unknown): value is number => {
    return typeof value === 'number' || value instanceof Number;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (value: unknown): string => {
    if (!isString(value))
        throw new Error('Not a string! Value: ' + value);

    return value;
};

const isHealthCheckRating = (value: number): value is HealthCheckRating => {
    return Object.values(HealthCheckRating).map(v => v).includes(value);
};

const parseHealthCheckRating = (value: unknown): HealthCheckRating => {
    if (!isNumber(value))
        throw new Error('Type mismatch! Passed type: ' + typeof value);

    if (!isHealthCheckRating(value))
        throw new Error('Wrong value! ' + value);

    return value;
};

const parseSickLeave = (object: unknown): SickLeave => {
    if (!object || typeof object !== 'object')
        throw new Error('Incorrect type! Passed type: ' + typeof object);

    if ('startDate' in object && 'endDate' in object) {
        return {
            startDate: parseString(object.startDate),
            endDate: parseString(object.endDate)
        };
    }

    throw new Error('Missing fields! StartDate: ' + ('startDate' in object) + '; endDate: ' + ('endDate' in object));
};

const parseDischarge = (object: unknown): Discharge => {
    if (!object || typeof object !== 'object')
        throw new Error('Incorrect type. Current type: ' + typeof object);

    if ('date' in object && 'criteria' in object) {
        return {
            date: parseString(object.date),
            criteria: parseString(object.criteria)
        };
    }

    throw new Error('Missing fields! Date: ' + ('date' in object) + '; criteria: ' + ('criteria' in object));
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        // we will just trust the data to be in correct form
        return [] as Array<Diagnosis['code']>;
    }

    return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const addHealthCheckInfo = (newEntry: NewBaseEntry, object: object): NewHealthCheckEntry => {
    if ('healthCheckRating' in object) {
        return {
            ...newEntry,
            type: 'HealthCheck',
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
        };
    }

    throw new Error('Incorrect or missing data. HealthCheckRating: ' + ('healthCheckRating' in object));
};

const addOccupationalHealthcareInfo = (newEntry: NewBaseEntry, object: object): NewOccupationalHealthcareEntry => {
    if ('employerName' in object && 'sickLeave' in object) {
        return {
            ...newEntry,
            type: 'OccupationalHealthcare',
            employerName: parseString(object.employerName),
            sickLeave: parseSickLeave(object.sickLeave)
        };
    }

    throw new Error('Incorrect or missing data. EmployerName: ' + ('date' in object && 'criteria' in object) + '; sickLeave: ' + ('sickLeave' in object));
};

const addHospitalInfo = (newEntry: NewBaseEntry, object: object): NewHospitalEntry => {
    if ('discharge' in object) {
        return {
            ...newEntry,
            type: 'Hospital',
            discharge: parseDischarge(object.discharge)
        };
    }

    throw new Error('Incorrect or missing data. Discharge');
};

export const toNewEntry = (object: unknown): NewEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect type. ' + typeof object);
    }

    if ('description' in object && 'date' in object && 'specialist' in object && 'diagnosisCodes' in object && 'type' in object) {
        const newEntry = {
            description: parseString(object.description),
            date: parseString(object.date),
            specialist: parseString(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object)
        };

        switch (object.type) {
            case 'HealthCheck':
                return addHealthCheckInfo(newEntry, object);
            case 'OccupationalHealthcare':
                return addOccupationalHealthcareInfo(newEntry, object);
            case 'Hospital':
                return addHospitalInfo(newEntry, object);
            default:
                throw new Error('Incorrect entry type! ' + object.type);
        }
    }

    throw new Error('Incorrect or missing data. Description: ' + ('description' in object) + '; date: ' + ('date' in object) + '; specialist: ' + ('specialist' in object) + '; diagnosisCodes: ' + ('diagnosisCodes' in object) + '; type: ' + ('type' in object));
};
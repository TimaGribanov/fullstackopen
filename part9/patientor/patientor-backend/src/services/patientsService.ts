import patientsData from '../data/patients-full';
import {Patient, NonSensitivePatient, NewPatient, Entry, NewEntry} from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
    return patientsData;
};

const getPrivatePatients = (): NonSensitivePatient[] => {
    return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

const getPatientById = (id: string): Patient => {
    const foundPatient: Patient | undefined = patientsData.find(p => p.id === id);

    if (foundPatient === undefined)
        throw Error('No patient found with the ID provided!');

    return foundPatient;
};

const getPrivatePatientById = (id: string): NonSensitivePatient => {
    const foundPatient: Patient = getPatientById(id);

    if (foundPatient === undefined)
        throw Error('No patient found with the ID provided!');

    return {
        id: foundPatient.id,
        name: foundPatient.name,
        dateOfBirth: foundPatient.dateOfBirth,
        gender: foundPatient.gender,
        occupation: foundPatient.occupation
    };
};

const addPatient = (entry: NewPatient): NonSensitivePatient => {
    const id: string = uuid();

    const newPatient: Patient = {
        id: id,
        ...entry
    };

    patientsData.push(newPatient);

    return getPrivatePatientById(id);
};

const addEntries = (patientId: string, entry: NewEntry): NonSensitivePatient => {
    const id: string = uuid();

    const newEntry: Entry = {
        id: id,
        ...entry
    };

    patientsData.find(p => p.id === patientId)?.entries.push(newEntry);

    return getPrivatePatientById(patientId);
};

export default {
    getPatients,
    getPrivatePatients,
    addPatient,
    getPrivatePatientById,
    getPatientById,
    addEntries
};
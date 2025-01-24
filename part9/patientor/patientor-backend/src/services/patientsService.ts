import patientsData from '../data/patients';
import {Patient, NonSensitivePatient} from '../types/types';

const getPatients = (): Patient[] => {
    return patientsData;
};

const getPrivatePatients = (): NonSensitivePatient[] => {
    return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

export default {
    getPatients,
    getPrivatePatients
};
import {z} from 'zod';
import {NewPatientSchema} from './utils';

export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave: {
        startDate: string;
        endDate: string;
    };
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
        date: string;
        criteria: string;
    };
}

export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry;

export interface Patient extends NewPatient {
    id: string;
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = z.infer<typeof NewPatientSchema>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}
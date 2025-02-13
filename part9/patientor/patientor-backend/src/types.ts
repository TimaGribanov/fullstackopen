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

export interface SickLeave {
    startDate: string;
    endDate: string;
}

export interface Discharge {
    date: string;
    criteria: string;
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave: SickLeave;
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
}

export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type NewBaseEntry = UnionOmit<BaseEntry, 'id'>;

export type NewHospitalEntry = UnionOmit<HospitalEntry, 'id'>;

export type NewOccupationalHealthcareEntry = UnionOmit<OccupationalHealthcareEntry, 'id'>;

export type NewHealthCheckEntry = UnionOmit<HealthCheckEntry, 'id'>;

export type NewEntry = NewHospitalEntry | NewOccupationalHealthcareEntry | NewHealthCheckEntry;

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
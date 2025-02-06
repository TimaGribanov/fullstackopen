import {Entry} from '../types';
import HospitalEntryBlock from './HospitalEntryBlock';
import HealthCheckEntryBlock from './HealthCheckEntryBlock';
import OccupationalHealthcareEntryBlock from './OccupationalHealthcareEntryBlock';

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const EntryBlock = ({entry}:{entry: Entry}) => {
    switch (entry.type) {
        case "Hospital":
            return <HospitalEntryBlock entry={entry} />;
        case "HealthCheck":
            return <HealthCheckEntryBlock entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntryBlock entry={entry} />;
        default:
            return assertNever(entry);
    }
};

export default EntryBlock;
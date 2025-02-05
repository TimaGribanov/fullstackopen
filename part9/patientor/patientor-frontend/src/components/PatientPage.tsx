import {Entry, Gender, Patient} from '../types.ts';
import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import patientService from '../services/patients';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import EntryBlock from './EntryBlock';

const PatientPage = () => {
    const id = useParams().id;
    const [patient, setPatient] = useState<Patient>(null);

    useEffect(() => {
        const fetchPatient = async () => {
            const patient = await patientService.getOne(id);
            setPatient(patient);
        };

        void fetchPatient();
    }, [id]);

    if (patient === null)
        return <h1>Loading...</h1>;

    return (
        <div>
            <h3>{patient.name} {patient.gender === Gender.Male ? <MaleIcon/> : patient.gender === Gender.Female ?
                <FemaleIcon/> : <TransgenderIcon/>}</h3>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            <h5>entries</h5>
            {patient.entries.map((entry: Entry) => <EntryBlock key={entry.id} entry={entry} />)}
        </div>
    );
};

export default PatientPage;
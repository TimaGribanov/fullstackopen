import {Gender, Patient} from '../types.ts';
import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import patientService from '../services/patients';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

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
        </div>
    );
};

export default PatientPage;
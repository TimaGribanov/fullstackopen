import {useEffect, useState} from 'react';
import diagnosesService from '../services/diagnoses';
import {Diagnosis} from '../types';

const DiagnosisBlock = ({code}: {code: string}) => {
    const [name, setName] = useState<string>('');

    useEffect(() => {
        const fetchDiagnosis = async () => {
            const diagnosis: Diagnosis = await diagnosesService.getOne(code);
            setName(diagnosis.name);
        };

        void fetchDiagnosis();
    }, [code]);

    return (
        <li>{code} {name}</li>
    );
};

export default DiagnosisBlock;
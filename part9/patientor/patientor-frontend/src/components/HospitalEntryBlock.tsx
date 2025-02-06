import {HospitalEntry} from '../types';
import DiagnosisBlock from './DiagnosisBlock';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const HospitalEntryBlock = ({entry}: {entry: HospitalEntry}) => {
    return (
        <div>
            <div>{entry.date} <LocalHospitalIcon /></div>
            <div><em>{entry.description}</em></div>
            <div>discharged on {entry.discharge.date} based on {entry.discharge.criteria}</div>
            {entry.diagnosisCodes !== undefined &&
              <ul>{entry.diagnosisCodes.map((code: string) => <DiagnosisBlock key={code} code={code} />)}</ul>}
        </div>
    );
};

export default HospitalEntryBlock;
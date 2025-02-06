import {OccupationalHealthcareEntry} from '../types';
import WorkIcon from '@mui/icons-material/Work';
import DiagnosisBlock from './DiagnosisBlock';
import FavoriteIcon from '@mui/icons-material/Favorite';

const OccupationalHealthcareEntryBlock = ({entry}: {entry: OccupationalHealthcareEntry}) => {
    return (
        <div>
            <div>{entry.date} <WorkIcon/> <em>{entry.employerName}</em></div>
            <div><em>{entry.description}</em></div>
            {entry.sickLeave !== undefined &&
                <div>sick leave is from {entry.sickLeave.startDate} until {entry.sickLeave.endDate}</div>}
            <div>diagnose by {entry.specialist}</div>
            {entry.diagnosisCodes !== undefined &&
              <ul>{entry.diagnosisCodes.map((code: string) => <DiagnosisBlock key={code} code={code}/>)}</ul>}
        </div>
    );
};

export default OccupationalHealthcareEntryBlock;
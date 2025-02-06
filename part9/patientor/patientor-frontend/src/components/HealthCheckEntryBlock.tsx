import {HealthCheckEntry} from '../types';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DiagnosisBlock from './DiagnosisBlock';

const HealthCheckEntryBlock = ({entry}: {entry: HealthCheckEntry}) => {
    let colour: string;
    if (entry.healthCheckRating === 0) {
        colour = 'success';
    } else if (entry.healthCheckRating === 1) {
        colour = 'warning';
    } else if (entry.healthCheckRating === 2) {
        colour = 'error';
    } else if (entry.healthCheckRating === 3) {
        colour = 'disabled';
    }

    return (
        <div>
            <div>{entry.date} <MedicalServicesIcon /></div>
            <div><em>{entry.description}</em></div>
            <div><FavoriteIcon color={colour}/></div>
            <div>diagnose by {entry.specialist}</div>
            {entry.diagnosisCodes !== undefined &&
              <ul>{entry.diagnosisCodes.map((code: string) => <DiagnosisBlock key={code} code={code} />)}</ul>}
        </div>
    );
};

export default HealthCheckEntryBlock;
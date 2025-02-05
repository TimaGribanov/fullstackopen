import {Entry} from '../types';
import DiagnosisBlock from './DiagnosisBlock';

const EntryBlock = ({entry}:{entry: Entry}) => {
    console.log(entry.date);
    return (
        <div>
            {entry.date} <em>{entry.description}</em>
            {entry.diagnosisCodes !== undefined &&
              <ul>{entry.diagnosisCodes.map((code: string) => <DiagnosisBlock key={code} code={code} />)}</ul>}
        </div>
    );
};

export default EntryBlock;
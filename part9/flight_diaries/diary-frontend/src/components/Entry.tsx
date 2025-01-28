import {Visibility, Weather} from '../types.ts';

const Entry = ({date, weather, visibility}: {date: string, weather: Weather, visibility: Visibility}) => {
    return (
        <div>
            <h3>{date}</h3>
            <p>visibility: {visibility}</p>
            <p>weather: {weather}</p>
        </div>
    )
};

export default Entry;
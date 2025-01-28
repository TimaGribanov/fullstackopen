import Entry from './components/Entry.tsx';
import React, {useEffect, useState} from 'react';
import {NewDiaryEntry, ShowDataEntry, Visibility, Weather} from './types.ts';
import {addNewEntry, getAllEntries} from './services.ts';

const isDataEntry = (value: unknown): value is ShowDataEntry => {
    return (value instanceof Object || typeof value === 'object')
        && value !== null
        && ('date' in value && 'weather' in value && 'visibility' in value && 'comment' in value)
}

const App = () => {
    const [data, setData] = useState<ShowDataEntry[]>([]);

    const [date, setDate] = useState<string>('');
    const [visibility, setVisibility] = useState<string>('');
    const [weather, setWeather] = useState<string>('');
    const [comment, setComment] = useState<string>('');

    const [error, setError] = useState<string>('');

    useEffect(() => {
        getAllEntries().then(data => setData(data));
    }, []);

    const addEntry = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        const newEntry: NewDiaryEntry = {
            date: date,
            visibility: visibility as Visibility,
            weather: weather as Weather,
            comment: comment
        }

        const newData = await addNewEntry(newEntry);

        if (isDataEntry(newData))
            setData(data.concat(newData));
        else if (typeof newData === 'undefined')
            setError('Undefined error');
        else {
            console.log(newData.data);
            setError(newData.data);
        }
    };

    return (
        <div>
            <div>
                {error !== '' && <p>{error}</p>}
                <h2>Add new entry</h2>
                <form onSubmit={addEntry}>
                    date: <input type={'date'} value={date} onChange={(event) => setDate(event.target.value)}/><br/>
                    visibility: <input type={'radio'} name={'visibility'} value={Visibility.Poor}
                                       onChange={(event) => setVisibility(event.target.value)}/> poor
                    <input type={'radio'} name={'visibility'} value={Visibility.Ok}
                           onChange={(event) => setVisibility(event.target.value)}/> OK
                    <input type={'radio'} name={'visibility'} value={Visibility.Good}
                           onChange={(event) => setVisibility(event.target.value)}/> good
                    <input type={'radio'} name={'visibility'} value={Visibility.Great}
                           onChange={(event) => setVisibility(event.target.value)}/> great
                    <br/>
                    weather: <input type={'radio'} name={'weather'} value={Weather.Cloudy}
                                    onChange={(event) => setWeather(event.target.value)}/> cloudy
                    <input type={'radio'} name={'weather'} value={Weather.Rainy}
                           onChange={(event) => setWeather(event.target.value)}/> rainy
                    <input type={'radio'} name={'weather'} value={Weather.Stormy}
                           onChange={(event) => setWeather(event.target.value)}/> stormy
                    <input type={'radio'} name={'weather'} value={Weather.Sunny}
                           onChange={(event) => setWeather(event.target.value)}/> sunny
                    <input type={'radio'} name={'weather'} value={Weather.Windy}
                           onChange={(event) => setWeather(event.target.value)}/> windy
                    <br/>
                    comment: <input type={'text'} value={comment}
                                    onChange={(event) => setComment(event.target.value)}/><br/>
                    <button type={'submit'}>add</button>
                </form>
            </div>

            <h2>Diary entries</h2>
            {data.map(e => <Entry key={e.id} date={e.date} weather={e.weather} visibility={e.visibility}/>)}
        </div>
    )
}

export default App

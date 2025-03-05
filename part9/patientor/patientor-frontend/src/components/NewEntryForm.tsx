import {
    Button,
    FormControl,
    Grid,
    Input,
    InputLabel,
    MenuItem, OutlinedInput,
    Select,
    SelectChangeEvent,
    TextField
} from '@mui/material';
import {useEffect, useState} from 'react';
import patientService from '../services/patients';
import {EntryType, NewBaseEntry, Diagnosis} from '../types';
import {AxiosError} from 'axios';
import diagnosesService from '../services/diagnoses';

interface EntryTypeOption {
    value: EntryType;
    label: string;
}

const entryTypeOptions: EntryTypeOption[] = Object.values(EntryType).map(v => ({
    value: v, label: v.toString()
}));

const ErrorBlock = ({error}: {error: string}) => {
    return (
        <div style={{border: '1px red solid', backgroundColor: 'rgb(255 0 0 / 50%)'}}>Error happened: {error}</div>
    );
};

const NewEntryForm = ({patientId}: { patientId: string }) => {
    const [entryType, setEntryType] = useState<EntryType>(EntryType.HealthCheck);

    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [specialist, setSpecialist] = useState<string>('');
    const [diagnoses, setDiagnoses] = useState<string[]>([]);

    const [healthcheckRating, setHealthcheckRating] = useState<number>(0);

    const [dischargeDate, setDischargeDate] = useState<string>('');
    const [dischargeCriteria, setDischargeCriteria] = useState<string>('');

    const [sickLeaveStart, setSickLeaveStart] = useState<string>('');
    const [sickLeaveEnd, setSickLeaveEnd] = useState<string>('');
    const [employerName, setEmployerName] = useState<string>('');

    const [error, setError] = useState<string>('');

    const [allDiagnoses, setAllDiagnoses] = useState<Diagnosis[]>([]);

    useEffect(() => {
        const fetchDiagnoses = async () => {
            const diagnoses: Diagnosis[] = await diagnosesService.getAll();
            setAllDiagnoses(diagnoses);
        };

        void fetchDiagnoses();
    }, []);

    const onEntryTypeChange = (event: SelectChangeEvent) => {
        event.preventDefault();

        const value = event.target.value;
        const type = Object.values(EntryType).find(et => et.toString() === value);
        if (type)
            setEntryType(type);
    };

    const onChangeDiagnoses = (event: SelectChangeEvent<typeof diagnoses>) => {
        const {target: { value },} = event;
        setDiagnoses(typeof value === 'string' ? value.split(',') : value,);
    };

    const cancelEntry = () => {
        setDescription('');
        setDate('');
        setSpecialist('');
        setHealthcheckRating(0);
        setDiagnoses([]);
        setDischargeDate('');
        setDischargeCriteria('');
        setSickLeaveStart('');
        setSickLeaveEnd('');
        setEmployerName('');
    };

    const addEntry = async (event) => {
        event.preventDefault();

        const newEntry: NewBaseEntry = {
            type: entryType,
            description: description,
            date: date,
            specialist: specialist,
            diagnosisCodes: diagnoses
        };

        switch (entryType) {
            case EntryType.HealthCheck:
                try {
                    await patientService.addEntry(patientId, {
                        ...newEntry,
                        healthCheckRating: healthcheckRating
                    });
                } catch (e: AxiosError) {
                    setError(e.response.data.split('\nat ')[0].split('<br>')[0].split('<pre>')[1]);
                }
                break;
            case EntryType.Hospital:
                try {
                    await patientService.addEntry(patientId, {
                        ...newEntry,
                        discharge: {
                            date: dischargeDate,
                            criteria: dischargeCriteria
                        }
                    });
                } catch (e: AxiosError) {
                    setError(e.response.data.split('\nat ')[0].split('<br>')[0].split('<pre>')[1]);
                }
                break;
            case EntryType.OccupationalHealthcare:
                try {
                    await patientService.addEntry(patientId, {
                        ...newEntry,
                        employerName: employerName,
                        sickLeave: {
                            startDate: sickLeaveStart,
                            endDate: sickLeaveEnd
                        }
                    });
                } catch (e: AxiosError) {
                    setError(e.response.data.split('\nat ')[0].split('<br>')[0].split('<pre>')[1]);
                }
                break;
        }
    };

    return (
        <div>
            {error && <ErrorBlock error={error} />}
            <form onSubmit={addEntry} style={{border: '3px dotted black', padding: '10px', paddingBottom: '50px'}}>
                <InputLabel style={{marginTop: 20}}>Entry type</InputLabel>
                <Select
                    label='Entry type'
                    fullWidth
                    value={entryType}
                    onChange={onEntryTypeChange}
                >
                    {entryTypeOptions.map(option =>
                        <MenuItem
                            key={option.label}
                            value={option.value}
                        >
                            {option.label}
                        </MenuItem>
                    )}
                </Select>
                <TextField
                    label='Description'
                    fullWidth
                    value={description}
                    onChange={({target}) => setDescription(target.value)}
                />
                <Input
                    type='date'
                    label='Date'
                    value={date}
                    onChange={({target}) => setDate(target.value)}
                />
                <TextField
                    label='Specialist'
                    fullWidth
                    value={specialist}
                    onChange={({target}) => setSpecialist(target.value)}
                />
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="diagCodes">Diagnosis codes</InputLabel>
                    <Select
                        labelId="diagCodes"
                        id="diagCodesSelect"
                        multiple
                        value={diagnoses}
                        onChange={onChangeDiagnoses}
                        input={<OutlinedInput label="Diagnosis codes" />}
                    >
                        {allDiagnoses.map((diagnose) => (
                            <MenuItem
                                key={diagnose.code}
                                value={diagnose.code}
                            >
                                {diagnose.code} {diagnose.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {/*<TextField*/}
                {/*    label='Diagnosis codes'*/}
                {/*    fullWidth*/}
                {/*    value={diagnoses}*/}
                {/*    onChange={({target}) => onChangeDiagnoses(target.value)}*/}
                {/*/>*/}

                {entryType === EntryType.HealthCheck && <TextField
                  type='number'
                  label='Healthcheck rating'
                  fullWidth
                  value={healthcheckRating}
                  onChange={({target}) => setHealthcheckRating(target.value)}
                />}

                {entryType === EntryType.OccupationalHealthcare && <TextField
                  label='Employer name'
                  fullWidth
                  value={employerName}
                  onChange={({target}) => setEmployerName(target.value)}
                />}

                {entryType === EntryType.OccupationalHealthcare &&
                  <Grid>
                    <Grid item>
                      <Input
                        type='date'
                        label='Sick-leave Start Date'
                        value={sickLeaveStart}
                        onChange={({target}) => setSickLeaveStart(target.value)}
                      />
                    </Grid>
                    <Grid item>
                      <Input
                        type='date'
                        label='Sick-leave End Date'
                        value={sickLeaveEnd}
                        onChange={({target}) => setSickLeaveEnd(target.value)}
                      />
                    </Grid>
                  </Grid>}

                {entryType === EntryType.Hospital &&
                  <Input
                    type='date'
                    label='Discharge Date'
                    value={dischargeDate}
                    onChange={({target}) => setDischargeDate(target.value)}
                  />}

                {entryType === EntryType.Hospital &&
                  <TextField
                    label='Discharge Criteria'
                    fullWidth
                    value={dischargeCriteria}
                    onChange={({target}) => setDischargeCriteria(target.value)}
                  />}

                <Grid>
                    <Grid item>
                        <Button
                            color='secondary'
                            variant='contained'
                            style={{float: 'left'}}
                            type='button'
                            onClick={cancelEntry}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            style={{
                                float: 'right',
                            }}
                            type='submit'
                            variant='contained'
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default NewEntryForm;
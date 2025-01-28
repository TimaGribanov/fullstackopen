import axios from 'axios';
import {NewDiaryEntry, ShowDataEntry} from './types.ts';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllEntries = async () => {
    const response = await axios.get<ShowDataEntry[]>(baseUrl);

    return response.data;
}

export const addNewEntry = async (newEntry: NewDiaryEntry) => {
    try {
        const response = await axios.post<ShowDataEntry[]>(baseUrl, newEntry);

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.status)
            console.error(error.response);

            return error.response;
        } else {
            console.error(error);
        }
    }
}
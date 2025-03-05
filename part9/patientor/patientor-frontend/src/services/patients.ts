import axios from "axios";
import {NewEntry, Patient, PatientFormValues} from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getOne = async (id: string) => {
  const { data } = await axios.get<Patient>(
      `${apiBaseUrl}/patients/${id}`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const addEntry = async (id: string, object: NewEntry) => {
  let objectToSend: NewEntry;

  if ('healthCheckRating' in object)
    objectToSend = {
      ...object,
      healthCheckRating: Number(object.healthCheckRating)
    };
  else
    objectToSend = object;

  console.log(objectToSend);
  const { data } = await axios.post<Patient>(
      `${apiBaseUrl}/patients/${id}/entries`,
      objectToSend
  );

  return data;
};

export default {
  getAll, create, getOne, addEntry
};


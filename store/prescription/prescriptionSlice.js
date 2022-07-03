import { createSlice } from '@reduxjs/toolkit'

import { database } from '../../firebaseConfig';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';

const initialState = {
  inputs: [
    {name: 'serial_no', display_name: 'Serial No.', type: 'number', value: ''},
    {name: 'date', display_name: 'Date', type: 'timestamp', value: ''},
    {name: 'first_name', display_name: 'First Name', type: 'string', value: ''},
    {name: 'last_name', display_name: 'Last Name', type: 'string', value: ''},
    {name: 'contact', display_name: 'Contact', type: 'number', value: ''},
    {name: 'age', display_name: 'Age', type: 'number', value: ''},
    {name: 'email', display_name: 'Email', type: 'string', value: ''},
    {name: 'existing_medical_conditions', display_name: 'Existing Medical Conditions', type: 'list', value: []},
    {name: 'category', display_name: 'Category', type: 'enum', options: [], value: ''},
    {name: 'sub_category', display_name: 'Sub Category', type: 'enum', options: [], value: ''},
    {name: 'symptoms', display_name: 'Symptoms', type: 'list', value: []},
    {name: 'symptoms_description', display_name: 'Description', type: 'string', value: ''},
    {name: 'doctors_comment', display_name: "Doctor's Category", type: 'string', value: ''},
  ],
}

export const prescriptionSlice = createSlice({
  name: 'prescription',
  initialState,
  reducers: {
    setInputValue: (state, action) => {
      for (let i = 0; i < state.inputs.length; i++) {
        if (state.inputs[i].name === action.payload.name) {
          switch (state.inputs[i].type) {
            case 'number':
              state.inputs[i].value = parseInt(action.payload.value);
              break;
            case 'list':
              state.inputs[i].value = action.payload.value.split(', ');
              break;
            default:
              state.inputs[i].value = action.payload.value;
          }
        }
      }
    },
  },
})

export const { setInputValue } = prescriptionSlice.actions;
export default prescriptionSlice.reducer;
export const generatePrescription = (inputs) => async () => {
  const prescriptionJSON = {
    serial_no: '',
    name: '',
    time_stamp: '',
    inputs: {},
  };
  prescriptionJSON.serial_no = inputs[0].value;
  prescriptionJSON.time_stamp = inputs[1].value;
  prescriptionJSON.name = inputs[2].value + ' ' + inputs[3].value;
  prescriptionJSON.status = 'On Medication';
  prescriptionJSON.inputs = inputs.reduce((acc, input) => {
    acc[input.name] = input.value;
    return acc;
  }, {});
  await setDoc(doc(database, "prescriptions", `${prescriptionJSON.serial_no}`), prescriptionJSON);
};

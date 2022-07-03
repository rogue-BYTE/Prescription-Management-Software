import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { app, database } from '../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

import { setInputValue, generatePrescription } from '../store/prescription/prescriptionSlice';

export default function() {
  // Init
  const categories = ['Ear', 'Nose', 'Throat'];
  const [ready, setReady] = useState(false);
  const [id, setId] = useState();
  const time_stamp = Date.now();
  const dateObj = new Date(time_stamp);
  const [date, setDate] = useState(`${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`);
  const prescription_inputs = useSelector(state => state.prescription.inputs);

  useEffect(() => {
    // Firebase operations
    const getId = async() => {
      const querySnapshot = await getDocs(collection(database, "prescriptions"));
      setId(querySnapshot.size);
      dispatch(setInputValue({name: 'serial_no', value: querySnapshot.size}));
    };
    getId();
    dispatch(setInputValue({name: 'date', value: dateObj}));
  }, [])

  // Image upload handler code
  // const [files, setFiles] = useState([]);
  // const handleUpload = (e) => {
  //   console.log(e.target.files);
  //   setFiles(files.concat(URL.createObjectURL(e.target.files[0])));
  // }

  //? Action Handlers
  //* Prescription Input Handler
  const dispatch = useDispatch();
  const handleInputValue = (e) => {
    dispatch(setInputValue({name: e.target.name, value: e.target.value}));
  }
  //* Generate Prescription
  const handleSubmit = () => {
    dispatch(generatePrescription(prescription_inputs));
  }

  return (
      <div
        className="text-black p-14 rounded-3xl bg-[#E8E4E6]"
      >
        <div className="columns-2 mb-3">
          <div className="grid grid-cols-4 text-start">
            <span>Serial No.</span>
            <input 
              className="rounded-3xl col-span-2 border-2 border-[#004643] pl-2 text-[#928F90]"
              name="serial_no"
              value={id || ''}
              disabled
            />
          </div>
          <div className="grid grid-cols-4 text-start">
            <span>Date</span>
            <input
              className="rounded-3xl col-span-3 border-2 border-[#004643] pl-2 text-[#928F90]"
              name="date"
              value={date || ''}
              disabled
            />
          </div>
        </div>

        <div className="text-start text-xl border-b-2 border-b-gray-300 mb-4">
          <p>Personal Details</p>
        </div>
        <div className="columns-2 mb-3">
          <div className="grid grid-cols-4 text-start">
            <span className="font-thin">First Name</span>
            <input
              className="rounded-3xl col-span-3 border-2 border-[#004643] pl-2 text-[#928F90]"
              name="first_name"
              onInput={handleInputValue}
            />
          </div>
          <div className="grid grid-cols-4 text-start">
            <span className="font-thin">Last Name</span>
            <input
              className="rounded-3xl col-span-3 border-2 border-[#004643] pl-2 text-[#928F90]"
              name="last_name"
              onInput={handleInputValue}
            />
          </div>
        </div>
        <div className="columns-2 mb-3">
          <div className="grid grid-cols-4 text-start">
            <span className="font-thin">Contact</span>
            <input
              className="rounded-3xl col-span-3 border-2 border-[#004643] pl-2 text-[#928F90]"
              name="contact"
              onInput={handleInputValue}
            />
          </div>
          <div className="grid grid-cols-4 text-start">
            <span className="font-thin">Age</span>
            <input
              className="rounded-3xl col-span-2 border-2 border-[#004643] pl-2 text-[#928F90]"
              name="age"
              onInput={handleInputValue}
            />
          </div>
        </div>
        <div className="mb-3 columns-1">
          <div className="grid grid-cols-8 text-start">
            <span className="font-thin">Email</span>
            <input
              className="rounded-3xl col-span-7 border-2 border-[#004643] pl-2 text-[#928F90]"
              name="email"
              onInput={handleInputValue}
            />
          </div>
        </div>
        <div className="mb-3">
          <div className="text-start">
            <p className="font-thin">Existing Medical Conditions</p>
            <textarea
              className="rounded-2xl col-span-12 border-2 border-[#004643] pl-2 w-full text-[#928F90]"
              name="existing_medical_conditions"
              onInput={handleInputValue}
            />
          </div>
        </div>

        <div className="text-start text-xl border-b-2 border-b-gray-300 mb-4">
          <p>Illness Details</p>
        </div>
        <div className="columns-2 mb-3">
          <div className="grid grid-cols-4 text-start">
            <span className="font-thin">Category</span>
            <select
              className="rounded-3xl col-span-3 border-2 border-[#004643] pl-2 text-[#928F90]"
              name="category"
              onInput={handleInputValue}
            >
              {categories.map(category => {
                return <option key={category}>{ category }</option>
              })}
            </select>
          </div>
          <div className="grid grid-cols-4 text-start">
            <span className="font-thin">Sub Category</span>
            <select
              className="rounded-3xl col-span-3 border-2 border-[#004643] bg-[#E8E4E6] pl-2 text-[#928F90]"
              name="sub_category"
              onInput={handleInputValue}
            />
          </div>
        </div>
        <div className="mb-3">
          <div className="text-start">
            <p className="font-thin">Symptops</p>
            <textarea
              className="rounded-2xl col-span-12 border-2 border-[#004643] pl-2 w-full text-[#928F90]"
              name="symptoms"
              onInput={handleInputValue}
            />
          </div>
        </div>
        <div className="mb-3">
          <div className="text-start">
            <p className="font-thin">Description</p>
            <textarea
              className="rounded-2xl col-span-12 border-2 border-[#004643] pl-2 w-full text-[#928F90]"
              name="symptoms_description"
              onInput={handleInputValue}
            />
          </div>
        </div>

        <div className="mb-3 text-start">
          <div className="text-start text-xl border-b-2 border-b-gray-300 mb-4 flex">
            <p>Diagnosis</p>
          </div>
          {/* <input type="file" onChange={handleUpload}/>
          <div className="flex flexWrap justify-start mb-3">
            {files.map(file => <div>
                                <img width="250px"src={file} className="mr-4"/>
                              </div>)}
          </div> */}
        </div>
        <div className="mb-3">
          <div className="text-start">
            <p className="font-thin">Doctor's Comment</p>
            <textarea
              className="rounded-2xl col-span-12 border-2 border-[#004643] pl-2 w-full text-[#928F90]"
              name="doctors_comment"
              onInput={handleInputValue}
            />
          </div>
        </div>

        <div className="text-start text-xl border-b-2 border-b-gray-300 mb-4 flex">
          <p>Prescription</p>
        </div>
        
        <div className="flex flex-row justify-end">
          <button className="bg-[#f9bc60] p-5 rounded-3xl drop-shadow-lg mr-5" onClick={handleSubmit}>Generate Prescription</button>
          <button className="bg-[#f9bc60] p-5 rounded-3xl drop-shadow-lg">Print Prescription</button>
        </div>
      </div>
  )
}
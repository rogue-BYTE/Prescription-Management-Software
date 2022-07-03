import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { app, database } from '../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

import { setInputValue, generatePrescription } from '../store/prescription/prescriptionSlice';

import BootstrapTable from 'react-bootstrap-table-next';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

export default function() {
  // Init
  const [prescriptions, setPrescriptions] = useState([]);
  useEffect(() => {
    // Firebase operations
    const getPrescriptions = async() => {
      const querySnapshot = await getDocs(collection(database, "prescriptions"));
      const temp = [];
      querySnapshot.forEach(doc => {
        const prescription = {};
        prescription.serial_no = doc.data().serial_no;
        prescription.name = doc.data().name;
        prescription.status = doc.data().status;
        const dateObj = doc.data().time_stamp.toDate()
        prescription.time_stamp = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`
        temp.push(prescription);
      });
      setPrescriptions(temp.reverse());
    };
    getPrescriptions();
  }, []);
  //Table
  const columns = [{
    dataField: 'serial_no',
    text: 'ID'
  }, {
    dataField: 'name',
    text: 'Name'
  }, {
    dataField: 'time_stamp',
    text: 'Date'
  }, {
    dataField: 'status',
    text: 'Status'
  }];
  //Action Handlers
  return (
    <div
      className="text-black p-14 rounded-3xl bg-[#E8E4E6]"
    >
      <div className="mb-4">
        <input className="search-input"/>
      </div>
      <BootstrapTable bootstrap4  keyField='id' data={ prescriptions } columns={ columns } />
    </div>
  )
}
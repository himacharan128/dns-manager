import React, { useContext, useEffect, useState } from 'react';
import DnsRecordTable from './DnsRecordTable';
import DnsRecordForm from './DnsRecordForm';
import Notification from './Notification';
import { AuthContext } from '../context/AuthContext';
import { getDnsRecords, addDnsRecord, deleteDnsRecord } from '../services/api';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [records, setRecords] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDnsRecords();
      setRecords(data);
    };
    fetchData();
  }, []);

  const handleAddRecord = async (record) => {
    const newRecord = await addDnsRecord(record);
    setRecords([...records, newRecord]);
    setNotification({ message: 'DNS record added successfully', type: 'success' });
  };

  const handleDeleteRecord = async (id) => {
    await deleteDnsRecord(id);
    setRecords(records.filter(record => record._id !== id));
    setNotification({ message: 'DNS record deleted successfully', type: 'success' });
  };

  return (
    <div className="dashboard">
      <h1>DNS Manager Dashboard</h1>
      {notification.message && <Notification message={notification.message} type={notification.type} />}
      <DnsRecordForm onAddRecord={handleAddRecord} />
      <DnsRecordTable records={records} onDeleteRecord={handleDeleteRecord} />
    </div>
  );
};

export default Dashboard;

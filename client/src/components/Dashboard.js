import React, { useEffect, useState } from 'react'; //useContext,
import DnsRecordTable from './DnsRecordTable';
import DnsRecordForm from './DnsRecordForm';
import Notification from './Notification';
// import { AuthContext } from '../context/AuthContext';
import { getDnsRecords, addDnsRecord, deleteDnsRecord } from '../services/api';
import NavBar from './NavBar';
import Loading from './Loading';

const Dashboard = () => {
  // const { user } = useContext(AuthContext);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDnsRecords();
        setRecords(data);
      } catch (error) {
        console.error('Failed to fetch DNS records:', error);
      } finally {
        setLoading(false);
      }
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

  const handleCloseNotification = () => {
    setNotification({ message: '', type: '' });
  };

  return (
    <div className="dashboard">
      <NavBar />
      <h1>DNS Manager Dashboard</h1>
      {loading ? (
        <Loading />
      ) : (
        <>
          {notification.message && (
            <Notification
              message={notification.message}
              type={notification.type}
              onClose={handleCloseNotification}
            />
          )}
          <DnsRecordForm onAddRecord={handleAddRecord} />
          <DnsRecordTable records={records} onDeleteRecord={handleDeleteRecord} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
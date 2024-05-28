import React, { useEffect, useState } from 'react'; //useContext,
import DnsRecordTable from './DnsRecordTable';
import DnsRecordForm from './DnsRecordForm';
import Notification from './Notification';
// import { AuthContext } from '../context/AuthContext';
import { getDnsRecords, addDnsRecord, deleteDnsRecord } from '../services/api';
import NavBar from './NavBar';
import Loading from './Loading';
import Modal from './Modal';
import { Bar, Pie } from 'react-chartjs-2';
import { FaPlus } from 'react-icons/fa';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PieController,
  ArcElement,
  Title,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [showModal, setShowModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

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
    try {
      const newRecord = await addDnsRecord(record);
      setRecords([...records, newRecord]);
      setNotification({ message: 'DNS record added successfully', type: 'success' });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setNotification({ message: 'Duplicate entry', type: 'error' });
      } else {
        setNotification({ message: 'Failed to add DNS record', type: 'error' });
      }
    } finally {
      setShowFormModal(false);
    }
  };
  

  const handleDeleteRecord = async (id) => {
    await deleteDnsRecord(id);
    setRecords(records.filter(record => record._id !== id));
    setNotification({ message: 'DNS record deleted successfully', type: 'success' });
  };

  const handleCloseNotification = () => {
    setNotification({ message: '', type: '' });
  };

  const domainDistribution = records.reduce((acc, curr) => {
    acc[curr.domain] = (acc[curr.domain] || 0) + 1;
    return acc;
  }, {});

  const typeDistribution = records.reduce((acc, curr) => {
    acc[curr.type] = (acc[curr.type] || 0) + 1;
    return acc;
  }, {});

  const domainChartData = {
    labels: Object.keys(domainDistribution),
    datasets: [
      {
        label: 'Domain Distribution',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: Object.values(domainDistribution),
      },
    ],
  };

  const typeChartData = {
    labels: Object.keys(typeDistribution),
    datasets: [
      {
        label: 'Record Type Distribution',
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        data: Object.values(typeDistribution),
      },
    ],
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', color: '#333' }}>
      <NavBar />
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>DNS Manager Dashboard</h1>
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
          <button 
            onClick={() => setShowFormModal(true)} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '20px auto', 
              padding: '10px 20px', 
              fontSize: '16px', 
              cursor: 'pointer', 
              backgroundColor: '#4CAF50', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '5px' 
            }}
          >
            <FaPlus style={{ marginRight: '8px' }} /> Add DNS Record
          </button>
          <button style={{ display: 'block', margin: '20px auto', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }} 
              onClick={() => setShowModal(true)}>Show Graph</button>
          <DnsRecordTable records={records} onDeleteRecord={handleDeleteRecord} />
          
          <Modal show={showModal} onClose={() => setShowModal(false)}>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', margin: '20px 0' }}>
              <div style={{ width: '45%', margin: '20px 0' }}>
                <h2 style={{ textAlign: 'center' }}>Domain Distribution</h2>
                <div style={{ width: '100%', height: '300px' }}>
                  <Bar data={domainChartData} options={{ maintainAspectRatio: false }} />
                </div>
              </div>
              <div style={{ width: '45%', margin: '20px 0' }}>
                <h2 style={{ textAlign: 'center' }}>Record Type Distribution</h2>
                <div style={{ width: '100%', height: '300px' }}>
                  <Pie data={typeChartData} options={{ maintainAspectRatio: false }} />
                </div>
              </div>
            </div>
          </Modal>

          <Modal show={showFormModal} onClose={() => setShowFormModal(false)}>
            <DnsRecordForm onAddRecord={handleAddRecord} />
          </Modal>
        </>
      )}
    </div>
  );
};

export default Dashboard;

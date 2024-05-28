import React, { useState } from 'react';
import { addDnsRecordBulk } from '../services/api';
import Loading from './Loading';

const DnsRecordForm = ({ onAddRecord, onCloseModal }) => {
  const [formData, setFormData] = useState({ domain: '', type: 'A', value: '', ttl: 300 });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateValue = (type, value) => {
    const patterns = {
      A: /^(\d{1,3}\.){3}\d{1,3}$/,
      AAAA: /^[0-9a-fA-F:]{2,39}$/,
      CNAME: /^mytestdomain\.com$/,
      MX: /^\d+\smytestdomain\.com$/,
      NS: /^[a-zA-Z0-9]+\.mytestdomain\.com$/,
      PTR: /^mytestdomain\.com$/,
    };

    return patterns[type] ? patterns[type].test(value) : true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateValue(formData.type, formData.value)) {
      setError('Invalid value for the selected record type.');
      return;
    }

    try {
      await onAddRecord(formData);
      setFormData({ domain: '', type: 'A', value: '', ttl: 300 });
      onCloseModal();
    } catch (error) {
      console.error('Failed to add DNS record:', error);
      setError('Failed to add DNS record. Please check your input and try again.');
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleBulkUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    setLoading(true);
    setError('');
    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target.result;
      let records;

      try {
        if (file.type === 'application/json') {
          records = JSON.parse(content);
        } else if (file.type === 'text/csv') {
          records = csvToJson(content);
        } else {
          throw new Error('Unsupported file type');
        }

        const response = await addDnsRecordBulk(records);
        if (response.status === 207) {
          const { savedRecords, duplicateEntries } = response.data;
          alert(`Bulk upload partially successful! ${savedRecords.length} records added. ${duplicateEntries.length} duplicate entries found.`);
          onCloseModal();
        } else {
          alert('Bulk upload successful!');
          onCloseModal();
        }
      } catch (error) {
        console.error('Bulk upload failed:', error);
        setError('Bulk upload failed. Please check the file format, duplicate entries, and try again.');
      } finally {
        setLoading(false);
      }
    };

    reader.readAsText(file);
  };

  const csvToJson = (csv) => {
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map(line => {
      const data = line.split(',');
      return {
        domain: data[0].trim(),
        type: data[1].trim(),
        value: data[2].trim(),
        ttl: parseInt(data[3].trim(), 10)
      };
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', width: '100%', maxWidth: '500px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
      {loading && <Loading />}
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <input
        type="text"
        name="domain"
        value={formData.domain}
        onChange={handleChange}
        placeholder="Domain"
        required
        style={{ padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <span style={{ fontSize: 'small', color: 'red' }}>
        Domain name must be in the format XXXX.mytestdomain.com, as this is the only domain permitted in the zone.
      </span>
      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        style={{ padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
      >
        <option value="A">A</option>
        <option value="AAAA">AAAA</option>
        <option value="CNAME">CNAME</option>
        <option value="MX">MX</option>
        <option value="NS">NS</option>
        <option value="PTR">PTR</option>
        <option value="SOA">SOA</option>
        <option value="SRV">SRV</option>
        <option value="TXT">TXT</option>
      </select>
      <input
        type="text"
        name="value"
        value={formData.value}
        onChange={handleChange}
        placeholder="Value"
        required
        style={{ padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <input
        type="number"
        name="ttl"
        value={formData.ttl}
        onChange={handleChange}
        placeholder="TTL"
        required
        style={{ padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <button type="submit" style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#4CAF50', color: '#fff', cursor: 'pointer' }}>Add Record</button>

      <input
        type="file"
        accept=".json, .csv"
        onChange={handleFileChange}
        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <button type="button" onClick={handleBulkUpload} style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#2196F3', color: '#fff', cursor: 'pointer' }}>Bulk Upload</button>
    </form>
  );
};

export default DnsRecordForm;

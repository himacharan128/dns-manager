import React, { useState } from 'react';
import { addDnsRecordBulk } from '../services/api';
import Loading from './Loading';

const DnsRecordForm = ({ onAddRecord, onCloseModal }) => {
  const [formData, setFormData] = useState({ domain: '', type: 'A', value: '', ttl: 300 });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onAddRecord(formData);
      setFormData({ domain: '', type: 'A', value: '', ttl: 300 });
      onCloseModal();
    } catch (error) {
      console.error('Failed to add DNS record:', error);
      // Handle error (e.g., show error message)
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

        await addDnsRecordBulk(records);
        alert('Bulk upload successful!');
        onCloseModal();
      } catch (error) {
        console.error('Bulk upload failed:', error);
        alert('Bulk upload failed. Please check the file format.');
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
      return headers.reduce((obj, header, index) => {
        obj[header.trim()] = data[index].trim();
        return obj;
      }, {});
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', width: '100%', maxWidth: '500px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
      {loading && <Loading />}
      <input
        type="text"
        name="domain"
        value={formData.domain}
        onChange={handleChange}
        placeholder="Domain"
        required
        style={{ padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
      />
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
        <option value="DNSSEC">DNSSEC</option>
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



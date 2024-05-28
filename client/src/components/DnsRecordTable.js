import React, { useState } from 'react';

const DnsRecordTable = ({ records, onDeleteRecord }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');

  const filteredRecords = records.filter(record => {
    return record.domain.toLowerCase().includes(searchTerm.toLowerCase()) &&
           (!filterType || record.type === filterType);
  });

  return (
    <div style={{ margin: '20px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by domain..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ padding: '10px', width: '200px' }}
        />
        <select value={filterType} onChange={e => setFilterType(e.target.value)} style={{ padding: '10px', width: '200px' }}>
          <option value="">All Types</option>
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
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Domain</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Type</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Value</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>TTL</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((record) => (
            <tr key={record._id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{record.domain}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{record.type}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{record.value}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{record.ttl}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <button onClick={() => onDeleteRecord(record._id)} style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: '#f44336', color: '#fff', border: 'none' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DnsRecordTable;

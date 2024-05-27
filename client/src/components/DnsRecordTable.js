import React, { useState } from 'react';

const DnsRecordTable = ({ records, onDeleteRecord }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');

  const filteredRecords = records.filter(record => {
    return record.domain.toLowerCase().includes(searchTerm.toLowerCase()) &&
           (!filterType || record.type === filterType);
  });

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search by domain..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select value={filterType} onChange={e => setFilterType(e.target.value)}>
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
          <option value="DNSSEC">DNSSEC</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Domain</th>
            <th>Type</th>
            <th>Value</th>
            <th>TTL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((record) => (
            <tr key={record._id}>
              <td>{record.domain}</td>
              <td>{record.type}</td>
              <td>{record.value}</td>
              <td>{record.ttl}</td>
              <td>
                <button onClick={() => onDeleteRecord(record._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DnsRecordTable;

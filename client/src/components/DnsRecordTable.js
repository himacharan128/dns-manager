import React from 'react';

const DnsRecordTable = ({ records, onDeleteRecord }) => {
  return (
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
        {records.map((record) => (
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
  );
};

export default DnsRecordTable;

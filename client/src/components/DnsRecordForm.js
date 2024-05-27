import React, { useState } from 'react';

const DnsRecordForm = ({ onAddRecord }) => {
  const [formData, setFormData] = useState({ domain: '', type: 'A', value: '', ttl: 300 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddRecord(formData);
    setFormData({ domain: '', type: 'A', value: '', ttl: 300 });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="domain" value={formData.domain} onChange={handleChange} placeholder="Domain" required />
      <select name="type" value={formData.type} onChange={handleChange}>
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
      <input type="text" name="value" value={formData.value} onChange={handleChange} placeholder="Value" required />
      <input type="number" name="ttl" value={formData.ttl} onChange={handleChange} placeholder="TTL" required />
      <button type="submit">Add Record</button>
    </form>
  );
};

export default DnsRecordForm;

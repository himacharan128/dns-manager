const DnsRecord = require('../models/DnsRecord');
const { createRecord, deleteRecord } = require('../utils/awsRoute53');

const getDnsRecords = async (req, res) => {
  try {
    const records = await DnsRecord.find();
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addDnsRecord = async (req, res) => {
  const { domain, type, value, ttl } = req.body;
  try {
    const newRecord = new DnsRecord({ domain, type, value, ttl });
    await newRecord.save();
    await createRecord(domain, type, value, ttl); 
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteDnsRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await DnsRecord.findById(id);
    if (!record) {
      return res.status(404).json({ message: 'DNS record not found' });
    }
    await deleteRecord(record.domain, record.type, record.value);
    await record.remove();
    res.json({ message: 'DNS record deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDnsRecords, addDnsRecord, deleteDnsRecord };

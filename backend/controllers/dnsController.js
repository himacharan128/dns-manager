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
    // add the record to Route 53
    await createRecord(domain, type, value, ttl);
    // If success then create MongoDB record
    const existingRecord = await DnsRecord.findOne({ domain, type, value });
    if (existingRecord) {
      existingRecord.ttl = ttl;
      await existingRecord.save();
      return res.status(200).json(existingRecord);
    } else {
      const newRecord = new DnsRecord({ domain, type, value, ttl });
      await newRecord.save();
      return res.status(201).json(newRecord);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to add DNS record to Route 53' });
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
    await DnsRecord.deleteOne({ _id: id });
    
    res.json({ message: 'DNS record deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




module.exports = { getDnsRecords, addDnsRecord, deleteDnsRecord };

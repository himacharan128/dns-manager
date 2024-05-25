const mongoose = require('mongoose');

const DnsRecordSchema = new mongoose.Schema({
  domain: { type: String, required: true },
  type: { type: String, required: true },
  value: { type: String, required: true },
  ttl: { type: Number, required: true },
});

module.exports = mongoose.model('DnsRecord', DnsRecordSchema);

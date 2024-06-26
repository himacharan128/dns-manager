const express = require('express');
const router = express.Router();
const { getDnsRecords, addDnsRecord, deleteDnsRecord, addDnsRecordsBulk } = require('../controllers/dnsController');
const auth = require('../middlewares/auth');

router.get('/', auth, getDnsRecords);
router.post('/', auth, addDnsRecord);
router.delete('/:id', auth, deleteDnsRecord);
router.post('/bulk', addDnsRecordsBulk);

module.exports = router;

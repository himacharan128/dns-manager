const express = require('express');
const router = express.Router();
const { getDnsRecords, addDnsRecord, deleteDnsRecord } = require('../controllers/dnsController');
const auth = require('../middlewares/auth');

router.get('/', auth, getDnsRecords);
router.post('/', auth, addDnsRecord);
router.delete('/:id', auth, deleteDnsRecord);
 
module.exports = router;

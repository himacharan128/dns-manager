const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
});

const route53 = new AWS.Route53();

const createRecord = async (domain, type, value, ttl) => {
  const params = {
    ChangeBatch: {
      Changes: [
        {
          Action: 'CREATE',
          ResourceRecordSet: {
            Name: domain,
            Type: type,
            TTL: ttl,
            ResourceRecords: [{ Value: value }],
          },
        },
      ],
    },
    HostedZoneId: process.env.AWS_HOSTED_ZONE_ID,
  };
  await route53.changeResourceRecordSets(params).promise();
};

const deleteRecord = async (domain, type, value) => {
  const params = {
    ChangeBatch: {
      Changes: [
        {
          Action: 'DELETE',
          ResourceRecordSet: {
            Name: domain,
            Type: type,
            TTL: 300,
            ResourceRecords: [{ Value: value }],
          },
        },
      ],
    },
    HostedZoneId: process.env.AWS_HOSTED_ZONE_ID,
  };
  await route53.changeResourceRecordSets(params).promise();
};

module.exports = { createRecord, deleteRecord };

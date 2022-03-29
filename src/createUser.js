'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.main = async event => {
  const {first_name, last_name, email} = JSON.parse(event.body);

  const params = {
    TableName: 'usersTable',
    Item: {
      id: uuid.v1(),
      first_name,
      last_name,
      email
    }
  };
  console.log(params);
  await dynamoDB.put(params).promise();

  return {statusCode: 200, body: JSON.stringify(params.Item)};
};

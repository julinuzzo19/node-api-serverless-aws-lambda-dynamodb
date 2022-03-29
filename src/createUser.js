'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.main = async (event, context, callback) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: 'usersTable',
    Item: {
      id: uuid.v1(),
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email
    }
  };

  dynamoDB.put(params, err => {
    if (err) {
      console.error(err);
      callback(null, {
        statusCode: err.statusCode || 501,
        headers: {'Content-Type': 'text/plain'},
        body: 'Cant create the user .'
      });
      return;
    }
  });

  const response = {
    statusCode: 200,
    body: JSON.stringify(params.Item)
  };
  callback(null, response);
};

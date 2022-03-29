const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.main = async () => {
  try {
    const result = await dynamoDB.scan({TableName: 'usersTable'}).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items)
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: error
    };
  }
};

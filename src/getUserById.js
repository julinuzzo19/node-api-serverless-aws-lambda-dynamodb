const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.main = async event => {
  const {id} = event.pathParameters;

  const result = await dynamoDB.get({TableName: 'usersTable', Key: {id}}).promise();

  if (result.Item) {
    return {
      statusCode: 200,
      body: JSON.stringify(result.Item)
    };
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({message: 'User not found'})
    };
  }
};

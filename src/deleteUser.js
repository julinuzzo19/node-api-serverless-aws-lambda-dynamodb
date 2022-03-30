const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.main = async event => {
  try {
    const {id} = event.pathParameters;

    await dynamoDB.delete({TableName: 'usersTable', Key: {id}}).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'User deleted',
        id
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    };
  }
};

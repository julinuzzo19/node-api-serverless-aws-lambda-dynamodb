const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.main = async event => {
  try {
    const {email, last_name, first_name} = JSON.parse(event.body);
    const {id} = event.pathParameters;

    const result = await dynamoDB
      .update({
        TableName: 'usersTable',
        Key: {id},
        UpdateExpression:
          'set email = :email, last_name = :last_name, first_name = :first_name',
        ExpressionAttributeValues: {
          ':email': email,
          ':last_name': last_name,
          ':first_name': first_name
        },
        ReturnValues: 'ALL_NEW'
      })
      .promise();
    console.log('el resukltado es: ', result);
    if (result) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'User updated',
          result: result.Attributes
        })
      };
    }
    return {
      statusCode: 404,
      message: 'User not found'
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

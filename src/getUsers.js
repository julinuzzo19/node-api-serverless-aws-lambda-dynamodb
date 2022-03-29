const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.main = (event, context, callback) => {
  dynamoDB.scan(
    {
      TableName: 'usersTable'
    },
    (err, result) => {
      if (err) {
        console.error(err);
        callback(null, {
          statusCode: err.statusCode || 501,
          headers: {'Content-Type': 'text/plain'},
          body: 'cant get users'
        });
        return;
      } else {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(result.Items)
        });
      }
    }
  );
};

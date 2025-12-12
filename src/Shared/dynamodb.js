/**
 * Shared DynamoDB utilities
 */

const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.ORDERS_TABLE;

const putItem = async (item) => {
  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: item
  });
  
  return await docClient.send(command);
};

const getItem = async (key) => {
  const command = new GetCommand({
    TableName: TABLE_NAME,
    Key: key
  });
  
  const result = await docClient.send(command);
  return result.Item;
};

const updateItem = async (key, updateExpression, expressionAttributeValues) => {
  const command = new UpdateCommand({
    TableName: TABLE_NAME,
    Key: key,
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: 'ALL_NEW'
  });
  
  const result = await docClient.send(command);
  return result.Attributes;
};

module.exports = {
  putItem,
  getItem,
  updateItem
};
/**
 * Shared response utilities for Lambda functions
 */

const createResponse = (statusCode, body, headers = {}) => {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      ...headers
    },
    body: JSON.stringify(body)
  };
};

const successResponse = (data, statusCode = 200) => {
  return createResponse(statusCode, {
    success: true,
    data
  });
};

const errorResponse = (message, statusCode = 400, errorCode = null) => {
  return createResponse(statusCode, {
    success: false,
    error: {
      message,
      code: errorCode
    }
  });
};

module.exports = {
  createResponse,
  successResponse,
  errorResponse
};
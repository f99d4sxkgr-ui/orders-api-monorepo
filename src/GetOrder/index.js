/**
 * Get Order Lambda Function
 */

const { getItem } = require('../Shared/dynamodb');
const { successResponse, errorResponse } = require('../Shared/response');

exports.handler = async (event) => {
  try {
    console.log('Event:', JSON.stringify(event, null, 2));
    
    // Extract orderId from path parameters
    const { orderId } = event.pathParameters || {};
    
    if (!orderId) {
      return errorResponse('Missing orderId in path parameters', 400);
    }
    
    // Get order from DynamoDB
    const order = await getItem({ orderId });
    
    if (!order) {
      return errorResponse('Order not found', 404, 'ORDER_NOT_FOUND');
    }
    
    console.log('Order retrieved successfully:', orderId);
    
    return successResponse(order);
    
  } catch (error) {
    console.error('Error getting order:', error);
    return errorResponse('Internal server error', 500);
  }
};
/**
 * Create Order Lambda Function
 */

const { v4: uuidv4 } = require('uuid');
const { putItem } = require('../Shared/dynamodb');
const { successResponse, errorResponse } = require('../Shared/response');

exports.handler = async (event) => {
  try {
    console.log('Event:', JSON.stringify(event, null, 2));
    
    // Parse request body
    let body;
    try {
      body = JSON.parse(event.body);
    } catch (error) {
      return errorResponse('Invalid JSON in request body', 400);
    }
    
    // Validate required fields
    const { customerId, items, totalAmount } = body;
    
    if (!customerId || !items || !totalAmount) {
      return errorResponse('Missing required fields: customerId, items, totalAmount', 400);
    }
    
    if (!Array.isArray(items) || items.length === 0) {
      return errorResponse('Items must be a non-empty array', 400);
    }
    
    // Create order object
    const orderId = uuidv4();
    const now = new Date().toISOString();
    
    const order = {
      orderId,
      customerId,
      items,
      totalAmount,
      status: 'PENDING',
      createdAt: now,
      updatedAt: now
    };
    
    // Save to DynamoDB
    await putItem(order);
    
    console.log('Order created successfully:', orderId);
    
    return successResponse(order, 201);
    
  } catch (error) {
    console.error('Error creating order:', error);
    return errorResponse('Internal server error', 500);
  }
};
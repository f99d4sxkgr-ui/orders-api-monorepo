/**
 * Cancel Order Lambda Function
 */

const { getItem, updateItem } = require('../Shared/dynamodb');
const { successResponse, errorResponse } = require('../Shared/response');

exports.handler = async (event) => {
  try {
    console.log('Event:', JSON.stringify(event, null, 2));
    
    // Extract orderId from path parameters
    const { orderId } = event.pathParameters || {};
    
    if (!orderId) {
      return errorResponse('Missing orderId in path parameters', 400);
    }
    
    // Check if order exists
    const existingOrder = await getItem({ orderId });
    
    if (!existingOrder) {
      return errorResponse('Order not found', 404, 'ORDER_NOT_FOUND');
    }
    
    // Check if order can be cancelled
    if (existingOrder.status === 'CANCELLED') {
      return errorResponse('Order is already cancelled', 400, 'ORDER_ALREADY_CANCELLED');
    }
    
    if (existingOrder.status === 'COMPLETED') {
      return errorResponse('Cannot cancel completed order', 400, 'ORDER_COMPLETED');
    }
    
    // Update order status to CANCELLED
    const updatedOrder = await updateItem(
      { orderId },
      'SET #status = :status, updatedAt = :updatedAt',
      {
        ':status': 'CANCELLED',
        ':updatedAt': new Date().toISOString()
      }
    );
    
    console.log('Order cancelled successfully:', orderId);
    
    return successResponse(updatedOrder);
    
  } catch (error) {
    console.error('Error cancelling order:', error);
    return errorResponse('Internal server error', 500);
  }
};
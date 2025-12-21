import apiClient from './apiClient';

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  deliveryAddress: string;
  createdAt: string;
  updatedAt: string;
}

export const orderService = {
  // Create new order
  createOrder: async (orderData: {
    items: Array<{ productId: string; quantity: number }>;
    deliveryAddress: string;
  }): Promise<Order> => {
    try {
      const response = await apiClient.post('/orders', orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Get user orders
  getUserOrders: async (): Promise<Order[]> => {
    try {
      const response = await apiClient.get('/orders/my-orders');
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  // Get order by ID
  getOrderById: async (id: string): Promise<Order> => {
    try {
      const response = await apiClient.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },

  // Cancel order
  cancelOrder: async (id: string): Promise<Order> => {
    try {
      const response = await apiClient.put(`/orders/${id}/cancel`);
      return response.data;
    } catch (error) {
      console.error('Error canceling order:', error);
      throw error;
    }
  },
};


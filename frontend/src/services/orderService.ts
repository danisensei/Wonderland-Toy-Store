import apiClient from './apiClient';

export interface OrderItem {
  id?: string;
  productId: string;
  name?: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  deliveryAddress: string;
  city?: string;
  postalCode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderData {
  items: Array<{ productId: string; quantity: number }>;
  deliveryAddress: string;
  city?: string;
  postalCode?: string;
}

export const orderService = {
<<<<<<< Updated upstream
=======
  // Create new order
>>>>>>> Stashed changes
  createOrder: async (orderData: CreateOrderData): Promise<Order> => {
    try {
      const response = await apiClient.post('/orders', orderData);
      return response.data;
    } catch (error: any) {
      console.error('Error creating order:', error);
      throw new Error(error.message || 'Failed to create order');
    }
  },

  getUserOrders: async (): Promise<Order[]> => {
    try {
      const response = await apiClient.get('/orders/my-orders');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      throw new Error(error.message || 'Failed to fetch orders');
    }
  },

  getOrderById: async (id: string): Promise<Order> => {
    try {
      const response = await apiClient.get(`/orders/${id}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching order:', error);
      throw new Error(error.message || 'Failed to fetch order');
    }
  },

  cancelOrder: async (id: string): Promise<Order> => {
    try {
      const response = await apiClient.put(`/orders/${id}/cancel`);
      return response.data;
    } catch (error: any) {
      console.error('Error canceling order:', error);
      throw new Error(error.message || 'Failed to cancel order');
    }
  },
};

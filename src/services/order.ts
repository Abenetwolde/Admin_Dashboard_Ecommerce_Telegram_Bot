import api from "./api";

export const getOrderList = async (page: number, rowsPerPage: number) => {
    try {
      const response = await api.get(`order/getorders?page=${page + 1}&pageSize=${rowsPerPage}&sortBy=latest`);
      return response.data;
    } catch (error) {
      console.error('Error fetching category data:', error);
      throw new Error('Failed to fetch categories');
    }
  };
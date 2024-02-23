
import api from './api';


export const getUserList = async (page: number, rowsPerPage: number) => {
  try {
    const response = await api.get(`user/getallusers?page=${page + 1}&pageSize=${rowsPerPage}`);
    console.log("response.data", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching category data:', error);
    throw new Error('Failed to fetch categories');
  }
};

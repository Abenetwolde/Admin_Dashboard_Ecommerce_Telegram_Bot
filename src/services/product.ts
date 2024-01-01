
import { toast } from 'react-toastify';
import api from './api';

export const createProduct = async (product:any) => {
  try {
    const response = await api.post("product/create", product);
    if(response.data.success)
    {
        toast.success('Product created successfully!');
    }
    console.log("response",response.data)
    return response.data.product;
  } catch (error) {
    console.error("Error creating category:", error);
    throw new Error("Failed to create category");
  }
};

export const getProductList = async (page: number, rowsPerPage: number) => {
  try {
    const response = await api.get(`product/getproducts?page=${page + 1}&pageSize=${rowsPerPage}&sortBy=latest`);
    return response.data;
  } catch (error) {
    console.error('Error fetching category data:', error);
    throw new Error('Failed to fetch categories');
  }
};

import axios from 'axios';

export const createCategory = async (name: string, icon: string) => {
  try {
    const response = await axios.post("http://localhost:5000/api/createcategory", { name, icon });
    return response.data.category;
  } catch (error) {
    console.error("Error creating category:", error);
    throw new Error("Failed to create category");
  }
};

export const getCategoryList = async (page: number, rowsPerPage: number) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/getcategorys?page=${page + 1}&pageSize=${rowsPerPage}&sortBy=latest`);
    return response.data;
  } catch (error) {
    console.error('Error fetching category data:', error);
    throw new Error('Failed to fetch categories');
  }
};

import React, { useState } from 'react';
import { useDispatch} from 'react-redux';
import { createCategory } from '../services/category';
import { createCategorySuccess, fetchCategories } from '../redux/categorySlice';
import { toast } from 'react-toastify';
import ImageUploadComponent from './ImageUploadComponent';
import ImageDisplayComponent from './ImageDisplayComponent';

const NewCategoryForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [icon, setIcon] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
        const newCategory = await createCategory(name, icon);
    //   dispatch(fetchCategories());
      toast.success('Category created successfully!');
      dispatch(createCategorySuccess(newCategory));
      // other success handling, e.g., showing a success toast
    } catch (error) {
        toast.error('Failed to create category');
      // handle error, e.g., show error toast
    } finally {
      setLoading(false);
    }
  };
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);

  // Callback function to update the image URLs after upload
  const handleUploadFinish = (imageUrls: string[]) => {
    setUploadedImageUrls(imageUrls);
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="mb-8">
    <h2 className="text-2xl font-bold mb-4">New Category</h2>
    <div className="mb-4">
      <label className="block text-gray-700">Name</label>
      <input
        required
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700">Emoji</label>
      <input
        type="text"
        placeholder="Emoji"
        value={icon}
        onChange={(e) => setIcon(e.target.value)}
        className="w-full border p-2"
      />
    </div>
    <button type="submit" className="bg-blue-500 text-white p-2">
      {loading ? "Creating..." : "Create"}
    </button>

  </form>
  <ImageUploadComponent onUploadFinish={handleUploadFinish}/>
  {uploadedImageUrls.length > 0 && <ImageDisplayComponent imageUrls={uploadedImageUrls} />}
  </>
    // your form JSX here
  );
};

export default NewCategoryForm;

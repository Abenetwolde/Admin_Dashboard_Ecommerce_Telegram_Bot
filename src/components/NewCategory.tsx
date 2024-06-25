import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCategory } from '../services/category';
import { createCategorySuccess, /* fetchCategories */ } from '../redux/categorySlice';
import { toast } from 'react-toastify';
<<<<<<< HEAD
import { Button, TextField, Typography, useTheme } from "@mui/material";
import ImageUploadComponent from './ImageUploadComponent';
import ImageDisplayComponent from './ImageDisplayComponent';
import { styled } from '@mui/material/styles';

const NewCategoryForm: React.FC = () => {
  const theme = useTheme();
  const FormContainer = styled('div')(({ theme }) => ({
    // backgroundColor: theme.palette.common.white,
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'center',
    margin: 'auto',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50%',
    },
  }));

  const StyledForm = styled('form')(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[3],
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(3),
    width: '100%',
  }));

=======
import ImageUploadComponent from './ImageUploadComponent';
import ImageDisplayComponent from './ImageDisplayComponent';

const NewCategoryForm: React.FC = () => {
>>>>>>> origin/main
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
<<<<<<< HEAD


  return (
    <>
      <FormContainer>
        <StyledForm onSubmit={handleSubmit}>
        
            <Typography variant="subtitle2" noWrap sx={{ color: 'text.secondary' ,mb:"10px"}  }>
              New Category
            </Typography>
            {/* <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'left', marginBottom: '1rem', color: theme.palette.text.primary }}>New Category</h2> */}
          
          <div>
            <TextField
              required
              type="text"
              label="Name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              fullWidth
              sx={{ mb: 4 }}
            />
          </div>
          <div>
            <TextField
              type="text"
              label="Emoji"
              placeholder="Emoji"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              variant="outlined"
              fullWidth
              sx={{ mb: 4 }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </Button>
          </div>
        </StyledForm>
      </FormContainer>


=======
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);

  // Callback function to update the image URLs after upload
  const handleUploadFinish = (imageUrls: string[]) => {
    setUploadedImageUrls(imageUrls);
  };

  return (
    <>
<div className="mb-8 flex-col items-start justify-center mx-auto w-full">
  <form onSubmit={handleSubmit} className="flex-col items-start bg-white justify-center mx-auto w-1/2  shadow-lg">
    <div className='py-2 px-3'>
    <h2 className="text-xl font-bold text-left ">New Category</h2>
    </div>
  
    <div className="bg-slate-100 p-3">
      <div className="mb-4 text-left">
        <label className="text-gray-800">Name</label>
        <input
          required
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4 text-left">
        <label className="block text-gray-700">Emoji</label>
        <input
          type="text"
          placeholder="Emoji"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          className="w-full border p-2 focus:outline-none focus:shadow-outline"
        />
      </div>
      {/* <ImageUploadComponent onUploadFinish={handleUploadFinish} />
      {uploadedImageUrls.length > 0 && <ImageDisplayComponent imageUrls={uploadedImageUrls} />} */}
      <div className="flex justify-end">
        <button type="submit" className="bg-blue-400 text-white p-2">
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
      
    </div>
  </form>
</div>

  
>>>>>>> origin/main

    </>
    // your form JSX here
  );
};

export default NewCategoryForm;

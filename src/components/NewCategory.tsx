import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCategory } from '../services/category';
import { createCategorySuccess, /* fetchCategories */ } from '../redux/categorySlice';
import { toast } from 'react-toastify';
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



    </>
    // your form JSX here
  );
};

export default NewCategoryForm;

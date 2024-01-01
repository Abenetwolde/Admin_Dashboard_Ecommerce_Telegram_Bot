import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from '../../services/api';
import { createProduct } from '../../services/product';
import { useDispatch } from 'react-redux';
import { fetchProductSuccess } from '../../redux/productSlice';

interface ImagePreview {
    file: File;
    preview: string;
}

const CreateNewProduct: React.FC = () => {
    const dispatch = useDispatch();

    const [highlights, setHighlights] = useState<string[]>([]);
    const [highlightInput, setHighlightInput] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [category, setCategory] = useState<string>('659275a40385c98f668d3bc5');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [selectedImages, setSelectedImages] = useState<ImagePreview[]>([]);
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const addHighlight = () => {
        if (!highlightInput.trim()) return;
        setHighlights([...highlights, highlightInput]);
        setHighlightInput('');
    };

    const deleteHighlight = (index: number) => {
        setHighlights((prevHighlights) => prevHighlights.filter((h, i) => i !== index));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = e.target.files;

            if (files.length > 0) {
                const newImages = Array.from(files).map((file) => ({
                    file,
                    preview: URL.createObjectURL(file),
                }));

                setSelectedImages((prevImages) => [...prevImages, ...newImages]);
            }
        }
    };

    const handleUpload = async () => {
        if (selectedImages.length > 0) {
            setLoading(true);
            const formData = new FormData();
            for (let i = 0; i < selectedImages.length; i++) {
                formData.append('images', selectedImages[i].file);
            }

            try {
                const response = await api.post('product/upload', formData);
                console.log('Images uploaded successfully!', response.data.fileUrls);

                setUploadedImages(response.data.fileUrls);
                setSelectedImages([]);
                toast.success('Images uploaded successfully!');
            } catch (error) {
                console.error('Error uploading images:', error);
                toast.error('Error uploading images');
            } finally {
                setLoading(false);
            }
        }
    };

    const newProductSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const productData = {
            name,
            description,
            price,
            highlights,
            category
            // Add other fields as needed
        };
        const response= await createProduct(productData)
        dispatch(fetchProductSuccess(response));
    };

    return (
        <>
            <div className="mb-8 flex-col items-start justify-center mx-auto w-full">
                <form onSubmit={newProductSubmitHandler} className="flex flex-col sm:flex-row bg-white rounded-lg shadow p-4  mx-10" id="mainform">

                    <div className="flex flex-col gap-3 m-2 sm:w-1/2">
                        <TextField
                            label="Name"
                            variant="outlined"
                            size="small"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            label="Description"
                            multiline
                            rows={3}
                            required
                            variant="outlined"
                            size="small"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <TextField
                            label="Price"
                            type="number"
                            variant="outlined"
                            size="small"
                            InputProps={{
                                inputProps: {
                                    min: 0
                                }
                            }}
                            required
                            value={price}
                            onChange={(e:any) => setPrice(e.target.value)}
                        />



                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center border rounded">
                                <input value={highlightInput} onChange={(e) => setHighlightInput(e.target.value)} type="text" placeholder="Highlight" className="px-2 flex-1 outline-none border-none" />
                                <span onClick={() => addHighlight()} className="py-2 px-6 bg-primary-blue text-white rounded-r hover:shadow-lg cursor-pointer">Add</span>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                {highlights.map((h, i) => (
                                    <div className="flex justify-between rounded items-center py-1 px-2 bg-green-50">
                                        <p className="text-green-800 text-sm font-medium">{h}</p>
                                        <span onClick={() => deleteHighlight(i)} className="text-red-600 hover:bg-red-100 p-1 rounded-full cursor-pointer">
                                            <DeleteIcon />
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* ... Other form elements ... */}

                    <div className="flex flex-col gap-2 m-2 sm:w-1/2">
                        <h2 className="font-medium">Product Images</h2>
                        <div className="flex gap-2 overflow-x-auto h-32 border rounded">
                            {uploadedImages.length > 0 ? (
                                uploadedImages.map((imageUrl, index) => (
                                    <img key={index} src={imageUrl} alt={`Uploaded ${index}`} />
                                ))
                            ) : (
                                selectedImages.length > 0 && (
                                    <div className="flex gap-2 overflow-x-auto h-32 border rounded">
                                        {selectedImages.map((file, index) => (
                                            <img key={index} src={file.preview} alt={`Selected ${index}`} />
                                        ))}
                                    </div>
                                )
                            )}
                        </div>
                        {loading && <div>Loading...</div>}
                        <label className="rounded font-medium bg-gray-400 text-center cursor-pointer text-white p-2 shadow hover:shadow-lg my-2">
                            <input
                                type="file"
                                name="images"
                                accept="image/*"
                                multiple
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            Choose Files
                        </label>
                        <button type="button" onClick={handleUpload}>
                            Upload Images
                        </button>
                        <div className="flex justify-end">
                            <input
                                form="mainform"
                                type="submit"
                                className="bg-primary-orange uppercase w-1/3 p-3 text-white font-medium rounded shadow hover:shadow-lg cursor-pointer"
                                value="Submit"
                            />
                        </div>
                    </div>
                </form>
            </div>

            <ToastContainer />
        </>
    );
};

export default CreateNewProduct;

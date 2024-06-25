import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from '../../services/api';
import { createProduct } from '../../services/product';
import { useDispatch } from 'react-redux';
import { createProductSuccess, fetchProductSuccess } from '../../redux/productSlice';
import { Category } from '../../types/product';
import { Autocomplete, Typography } from '@mui/material';
import { getCategoryList } from '../../services/category';
import { ApiResponse, CategoryApi } from '../../types/Category';
import { Height } from '@mui/icons-material';
import Button from '@mui/material/Button';

interface ImagePreview {
    file: File;
    preview: string;
}
interface VideoPreview {
    file: File;
    preview: string;
}
const CreateNewProduct: React.FC = () => {
    const dispatch = useDispatch();

    const [highlights, setHighlights] = useState<string[]>([]);
    const [highlightInput, setHighlightInput] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [selectedImages, setSelectedImages] = useState<ImagePreview[]>([]);
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [vloading, setVLoading] = useState<boolean>(false);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState<VideoPreview | null>(null);
    const [uploadedVideo, setUploadedVideo] = useState<any>(null);
    const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedVideo({
                file,
                preview: URL.createObjectURL(file),
            });
        }
    };

    // Function to upload the selected video file
    const handleUploadVideo = async () => {
        if (selectedVideo) {
            setVLoading(true);
            const formData = new FormData();
            formData.append('video', selectedVideo.file);
            try {
                const response = await api.post('product/upload-video', formData);
                setSelectedVideo(null)
                setUploadedVideo(response.data.files[0]);
                console.log("response.data", response.data.files[0]);

                toast.success('Video uploaded successfully!');
            } catch (error) {
                console.error('Error uploading video:', error);
                toast.error('Error uploading video');
            } finally {
                setVLoading(false)
            }
        }
    };

    const addHighlight = () => {
        if (!highlightInput.trim()) return;
        setHighlights([...highlights, highlightInput]);
        setHighlightInput('');
    };

    const deleteHighlight = (index: number) => {
        setHighlights((prevHighlights) => prevHighlights.filter((h, i) => i !== index));
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        // if (e.target.files) {
        const files = e.target.files;

        if (files.length > 0) {
            const newImages = Array.from(files).map((file) => ({
                file,
                preview: URL.createObjectURL(file),
            }));

            setSelectedImages((prevImages) => [...prevImages, ...newImages]);
        }


        // const reader = new FileReader();

        // reader.onload = () => {
        //     if (reader.readyState === 2) {
        //         setImagesPreview((oldImages) => [...oldImages, reader.result]);
        //         setImages((oldImages) => [...oldImages, reader.result]);
        //     }
        // }
        // reader.readAsDataURL(file);

    };
    const handleRemoveSelected = (index: number) => {
        // Filter out the image at the specified index from selectedImages
        const updatedSelectedImages = selectedImages.filter((image, i) => i !== index);

        // Update the state with the updated selectedImages array
        setSelectedImages(updatedSelectedImages);
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
                console.log('Images uploaded successfully!', response.data.imageUrl);
                // console.log("see uplader image",response.data)
                setUploadedImages(response.data.imageUrl);
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
            category: selectedCategory._id,
            // images:images
            images: uploadedImages,
            video: uploadedVideo
            // Add other fields as needed
        };
        console.log(productData)
        console.log("images................", images)
        const response = await createProduct(productData)
        dispatch(createProductSuccess(response));
        setSelectedImages("")
        setUploadedImages("")
        setSelectedVideo(null)
        setUploadedVideo("")
        // setHighlights("")
        setHighlightInput("")
        setName("")
        setSelectedCategory
        setCategories([])
        setDescription('')
        setPrice(0)

    };
    const ClearValue = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setSelectedImages("")
        setUploadedImages("")
        setSelectedVideo(null)
        setUploadedVideo("")
        // setHighlights("")
        setHighlightInput("")
        setName("")
        setSelectedCategory
        setCategories([])
        setDescription('')
        setPrice(0)



    };
    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                const categoryData: ApiResponse = await api.get(`category/getcategories?&sortBy=latest`);;
                setCategories(categoryData?.data?.categorys);
                console.log("category...............", categoryData?.data?.categorys)
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategoryData();
    }, []);

    return (
        <>
            <div className="mb-8 flex-col items-start justify-center mx-auto w-full">
                <form onSubmit={newProductSubmitHandler} className="flex flex-col sm:flex-row rounded-lg shadow-xl p-4  mx-10" id="mainform" encType="multipart/form-data" >

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
                            // required
                            variant="outlined"
                            size="small"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <Autocomplete
                            options={categories}
                            getOptionLabel={(option) => option.name}
                            onChange={(_event, newValue) => setSelectedCategory(newValue)}
                            value={selectedCategory}
                            renderInput={(params) => <TextField {...params} label="Category" />}
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
                            // required
                            value={price}
                            onChange={(e: any) => setPrice(e.target.value)}
                        />



                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <TextField value={highlightInput} onChange={(e) => setHighlightInput(e.target.value)} type="text" placeholder="Highlight" className="px-2 flex-1 outline-none border-none bg-transparent" />
                                <Button
                                    onClick={() => addHighlight()}
                                    variant="contained"
                                    className="py-2 px-6 rounded-r hover:shadow-lg cursor-pointer"
                                    sx={{ height: '100%', padding: '12px 24px' }} // Adjust padding as needed
                                >
                                    Add
                                </Button>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                {highlights?.map((h, i) => (
                                    <div className="flex justify-between rounded items-center py-1 px-2">
                                        <p className=" text-sm font-medium">{h}</p>
                                        <span onClick={() => deleteHighlight(i)} className="text-red-600 p-1 rounded-full cursor-pointer">
                                            <DeleteIcon />
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* ... Other form elements ... */}

                    <div className="flex flex-col gap-2 m-2 sm:w-1/2">
                        <div>
                            <Typography variant="subtitle2" noWrap sx={{ color: 'text.secondary' ,mb:"10px"}}>Product Images</Typography>
                            <div className="flex gap-2 overflow-x-auto h-32 border rounded">
                                {uploadedImages?.length > 0 ? (
                                    uploadedImages?.map((imageUrl: any, index) => (
                                        <img key={index} src={`${imageUrl?.imageUrl}`} alt={`Uploaded ${index}`} />
                                    ))
                                ) : (
                                    selectedImages?.length > 0 && (
                                        <div className="flex gap-2 overflow-x-auto h-32 border rounded">
                                            {selectedImages?.map((file, index) => (
                                                <div key={index} className="relative">
                                                    <img src={file.preview} alt={`Selected ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

                                                    <Button
                                                        variant="contained"
                                                        sx={{ height: '100%', padding: '12px 24px' }} // Adjust padding as needed
                                                        className="absolute top-0 right-0 bg-red-400 text-white rounded-full  cursor-pointer"
                                                        onClick={() => handleRemoveSelected(index)}
                                                    >
                                                        X
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                )}
                            </div>
                            {loading && <div className='absolute top-10'>Loading...</div>}

                            <div className='flex items-center justify-center gap-4 w-full'>
                                {/* <label className="rounded font-medium text-center"> */}
                                <TextField
                                    type="file"
                                    name="images"
                                    inputProps={{ multiple: true, accept: 'image/*' }}
                                    onChange={handleFileChange}
                                    className="hidden"
                                />

                                <Button type="button" variant="contained"
                                    sx={{ height: '100%', padding: '12px 24px' }} onClick={handleUpload}>
                                    Upload Images
                                </Button>

                            </div>
                        </div>

                        <div className='mt-7 justify-center items-center w-full '>
                        <Typography variant="subtitle2" noWrap sx={{ color: 'text.secondary' ,mb:"10px"}}>Product Video</Typography>
                            <div className="flex gap-2 overflow-x-auto h-32 border rounded">
                                {selectedVideo && (
                                    <div>
                                        <video controls>
                                            <source src={selectedVideo?.preview} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                )}
                                {vloading && <div>Loading...</div>}


                                <div className="flex gap-2 overflow-x-auto h-32 border rounded">
                                    {uploadedVideo?.videoUrl && (
                                        <div>
                                            <video controls>
                                                <source src={uploadedVideo?.videoUrl} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>

                                            <Button
                                                variant="contained"
                                                sx={{ height: '100%', padding: '12px 24px' }} // Adjust padding as needed
                                                className="absolute top-0 right-0 bg-red-400 text-white rounded-full  cursor-pointer"
                                            // onClick={() => handleRemoveSelected()}
                                            >
                                                X
                                            </Button>
                                        </div>
                                    )}
                                </div>


                            </div>
                            {loading && <div className='absolute top-10'>Loading...</div>}

                            <div className='flex items-center justify-center mt-5 gap-4 w-full'>
                                {/* <label className="rounded font-medium text-center"> */}
                                <TextField
                                    type="file"
                                    name="images"
                                    inputProps={{ multiple: true, accept: 'video/*' }}
                                    onChange={handleVideoFileChange}
                                    className="hidden"
                                />

                                <Button type="button" variant="contained"
                                    sx={{ height: '100%', padding: '12px 24px' }} onClick={handleUploadVideo}>
                                    Upload Video
                                </Button>

                            </div>
                        </div>
                        <div className="flex gap-5 justify-end ">
                            <Button
                                // onClick={newProductSubmitHandler}
                                variant='contained'
                                form="mainform"
                                type="submit"
                                sx={{ height: '100%', padding: '12px 24px' }}
                                className=" bg-green-400 text-white hover:bg-green-500 uppercase w-1/3 p-3 text-blue font-medium rounded shadow hover:shadow-lg cursor-pointer"
                                value="Submit"
                            >
                                Submit

                            </Button>
                            <Button
                                onClick={ClearValue}
                                variant='contained'
                                form="mainform"
                                // type="submit"
                                sx={{ height: '100%', padding: '12px 24px' }}
                                className=" bg-green-400 text-white hover:bg-green-500 uppercase w-1/3 p-3 text-blue font-medium rounded shadow hover:shadow-lg cursor-pointer"
                            // value="Submit"
                            >
                                Clear

                            </Button>
                        </div>
                    </div>

                </form >
            </div >

            <ToastContainer />
        </>
    );
};

export default CreateNewProduct;

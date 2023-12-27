// src/components/ImageUploadComponent.tsx
import React, { useState } from 'react';

import api from '../services/api';

interface ImageUploadComponentProps {
  onUploadFinish: (imageUrls: string[]) => void;
}

const ImageUploadComponent: React.FC<ImageUploadComponentProps> = ({ onUploadFinish }) => {
  const [selectedImages, setSelectedImages] = useState<FileList | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImages(e.target.files);
    }
  };

  const handleUpload = async () => {
    if (selectedImages) {
      const formData = new FormData();
      for (let i = 0; i < selectedImages.length; i++) {
        formData.append('images', selectedImages[i]);
      }

      try {
        const response = await api.post('product/upload', formData);
        console.log('Images uploaded successfully!');
        
        // Call the onUploadFinish callback with the received image URLs
        onUploadFinish(response.data.fileUrls);
        console.log("file.",response.data.fileUrls)
      } catch (error) {
        console.error('Error uploading images:', error);
      }
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Images</button>
    </div>
  );
};

export default ImageUploadComponent;

// src/components/ImageDisplayComponent.tsx
import React from 'react';

interface ImageDisplayComponentProps {
  imageUrls: string[];
}

const ImageDisplayComponent: React.FC<ImageDisplayComponentProps> = ({ imageUrls }) => {
    const backendDomain = 'http://localhost:8000';
    console.log('Image URLs:', imageUrls.map(url => backendDomain + url));
  return (
    <div>
      <h2>Uploaded Images</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {imageUrls.map((url, index) => (
          <div key={index}>
           <img src={backendDomain + url} alt={`Image ${index}`} style={{ width: '100%', height: 'auto' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageDisplayComponent;

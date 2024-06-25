import React, { useEffect, useState } from 'react';


import { MutatingDots } from 'react-loader-spinner';


  const LoadingIndicator: React.FC = () => {


    return (
     
            <div className="flex justify-center items-center h-full">
              <MutatingDots
                height="100"
                width="100"
                color="#add8e6"  // Light Blue
                secondaryColor="#ffcccb"  // Light Red
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          )
    

   
};

export default LoadingIndicator;

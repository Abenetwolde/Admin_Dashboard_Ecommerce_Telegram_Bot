import React, { useState } from 'react';
import CategoryTable from '../components/CategoryTable';

function Category() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgMenu, setImgMenu] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [titleError, setTitleError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);

  const onSubmitValidation = () => {
    const titleError = !title.trim();
    const descriptionError = !description.trim();
    setTitleError(titleError);
    setDescriptionError(descriptionError);
    return !titleError && !descriptionError;
  };

  const clearFields = () => {
    setTitle('');
    setDescription('');
    setImgMenu('');
    setTitleError(null);
    setDescriptionError(null);
  };

  const onCompleted = () => {
    const message = 'Category added successfully';
    setSuccessMessage(message);
    setErrorMessage('');
    clearFields();
    setTimeout(hideMessage, 3000);
  };

  const onError = () => {
    const message = 'Action failed. Please try again';
    setSuccessMessage('');
    setErrorMessage(message);
    setTimeout(hideMessage, 3000);
  };

  const hideMessage = () => {
    setSuccessMessage('');
    setErrorMessage('');
  };

  return (
    <>
    <div className=" mx-auto  p-4 shadow absolute top-10 z-50 left-1/2 transform -translate-x-1/2 overflow-hidden">
      <div className="max-w-2xl mx-auto">
        <form className="bg-white p-8 rounded shadow">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              className={`appearance-none border ${titleError ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline`}
              id="title"
              type="text"
              placeholder="e.g Breakfast"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            {titleError && <p className="text-red-500 text-xs italic">Title is required</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <input
              className={`appearance-none border ${descriptionError ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline`}
              id="description"
              type="text"
              placeholder="e.g All happiness depends on leisurely breakfast."
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            {descriptionError && <p className="text-red-500 text-xs italic">Description is required</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imgMenu">
              Image
            </label>
            <div className="card-title-image">
              {imgMenu && typeof imgMenu === 'string' && (
                <img alt="menu img" className="w-full h-32 object-cover mb-2" src={imgMenu} />
              )}
              <input
                className="mt-4"
                type="file"
                onChange={(event) => {
                  const result = event.target.files[0];
                  setImgMenu(result);
                }}
              />
            </div>
          </div>
          <div className="text-right">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={(e) => {
                e.preventDefault();
                setSuccessMessage('');
                setErrorMessage('');
                if (onSubmitValidation()) {
                  // Handle form submission logic (mocked here)
                  onCompleted();
                }
              }}
            >
              Save
            </button>
          </div>
          <div className="mt-4">
            {successMessage && (
              <p className="text-green-500">{successMessage}</p>
            )}
            {errorMessage && (
              <p className="text-red-500">{errorMessage}</p>
            )}
          </div>
        </form>
     
      </div>
     
    </div>
    <CategoryTable/>
    </>
  );
}

export default Category;

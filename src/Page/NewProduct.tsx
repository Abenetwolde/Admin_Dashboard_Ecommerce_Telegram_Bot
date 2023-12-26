import { useState, ChangeEvent } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateProductMutation } from "../api/productApi";

const NewProduct = () => {
  const [name, setName] = useState<string>("");
  const [category, cName] = useState<string>("64ecaad1b7b5cd7dabd5ab12");
  const [price, setPrice] = useState<number>();
  const [warranty, setStock] = useState<number>();
  const [images, setPhoto] = useState<string>();
  const [createProduct, { data,  }] = useCreateProductMutation({});

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if(data){
      toast.success("Category created successfully!");}
    
    createProduct({ name, category, price, warranty, images })
      .unwrap()
      .then((response) => {
        if (response.data.success) {
          toast.success("Category created successfully!");}
        // Handle success (e.g., redirect)
      })
      .catch((error) => {
        // Handle error
        console.error('Error creating product:', error.message);
      });
  };
  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") setPhoto(reader.result);
      };
    }
  };
  // const columns = [
  //   { Header: 'ID', accessor: '_id' },
  //   { Header: 'Category Name', accessor: 'category.name' },
  //   {
  //     accessor: 'category',
  //     Header: 'Category',
  //     Cell: ({ value }) => (
  //       <div className="flex items-center">
  //         {value && value.icon && (
  //           <div
  //             className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center mr-2"
  //           >
  //             {value.icon}
  //           </div>
  //         )}
  //         {value && value.name}
  //       </div>
  //     ),
  //   },
  //   // how add two numbers?
  //   { Header: 'Price', accessor: 'price' },

  //   // add more common headers?


  //   // Add more columns as needed
  // ];
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <article>
          <form onSubmit={handleSubmit}>
            <h2>New Product</h2>
            <div>
              <label>Name</label>
              <input
                required
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>CName</label>
              <input
                required
                type="text"
                placeholder="Name"
                value={category}
                onChange={(e) => cName(e.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                required
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Stock</label>
              <input
                required
                type="number"
                placeholder="Stock"
                value={warranty}
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>

            <div>
              <label>Photo</label>
              <input required type="file" onChange={changeImageHandler} />
            </div>

            {images && <img src={images} alt="New Image" />}

            <button type="submit">Create</button>
          </form>
        </article>
      </main>
      <ToastContainer />
    </div>
  );
};

export default NewProduct;
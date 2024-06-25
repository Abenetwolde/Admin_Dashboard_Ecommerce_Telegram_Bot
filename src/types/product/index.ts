export interface Category {
    _id?: string;
  
      name: string;
      icon: string;
    
    
  }

export interface Product{
    _id?: string;
    name: string;
    description: string;
    price: number;
    available: boolean;
    category: Category;
    images: string[];
    orderQuantity: number;
    cookTime: string;
}
export interface ProdcutResponse {
    success: boolean;
    products: Product[];
    count: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }
  export interface UpdateProductResponse {
    success: boolean;
    product: Product;
  }
  export interface DeleteProductResponse {
    success: boolean;
    product: Product;
  }
export interface DeleteConfirmationProdcutModalProps {
    isOpen: boolean;
    handleClose: () => void;
    deletedItem: Product|null
  }
  
  export interface EditProdcutModalProps {
    isOpen: boolean;
    handleClose: () => void;
    editedRow: Product | null;
    setEditedRow: React.Dispatch<React.SetStateAction<Category | null>>;
  }

  



  export interface Payment {
    _id:string;
    user: number; // Assuming user ID is a number
    order:string ;
    shippingCharge?: number;
    total_amount: number;
    invoice_id: string;
    telegram_payment_charge_id: string;
}

// export interface ProdcutResponse {
//     success: boolean;
//     products: Product[];
//     count: number;
//     page: number;
//     pageSize: number;
//     totalPages: number;
//   }
//   export interface UpdateProductResponse {
//     success: boolean;
//     product: Product;
//   }
//   export interface DeleteProductResponse {
//     success: boolean;
//     product: Product;
//   }
// export interface DeleteConfirmationProdcutModalProps {
//     isOpen: boolean;
//     handleClose: () => void;
//     deletedItem: Product|null
//   }
  
//   export interface EditProdcutModalProps {
//     isOpen: boolean;
//     handleClose: () => void;
//     editedRow: Product | null;
//     setEditedRow: React.Dispatch<React.SetStateAction<Category | null>>;
//   }
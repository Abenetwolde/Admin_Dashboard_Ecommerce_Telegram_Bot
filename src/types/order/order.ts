export interface Category {
    _id?: string;
  
      name: string;
      icon: string;
    
    
  }

  interface OrderItem {
    quantity: number;
    product:  string;
  }
  
  interface ShippingInfo {
    location?: string;
    note?: string;
    phoneNo?: string;
  }
  
  interface Payment {
    _id:string;
    // Add other properties from the "payment" schema if needed
  }
  
  export interface Order {
    _id?: string;
    shippingInfo: ShippingInfo;
    orderItems: OrderItem[];
    user?: string;
    payment?: Payment;
    paymentStatus: 'pending' | 'completed';
    paymentType?: 'Cash' | 'online';
    totalPrice: number;
    telegramid?: number;
    orderStatus: 'pending' | 'completed'|'cancelled'|'delivered';
    orderfromtelegram: boolean;
    createdAt: Date;
  }
    export interface UpdateOrdertResponse {
    success: boolean;
    product: Order;
  }
    export interface EditOrderModalProps {
    isOpen: boolean;
    handleClose: () => void;
    editedRow: Order | null;
    setEditedRow: React.Dispatch<React.SetStateAction<Category | null>>;
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
export interface Category {
    _id?: string;
  
      name: string;
      icon: string;
    
    
  }
  export interface CategoryApi {
    _id: string;
      name: string;
      icon: string;
    
  }
  
  export interface ApiResponse {
    data: any;
    success: boolean;
    message?: string;
    categorys?: CategoryApi[];
    totalPages?: number;
    count?: number;
  }
  export interface EditApiResponse {
    success: boolean;
    category: CategoryApi;
  
  }

  export interface DeleteConfirmationModalProps {
    isOpen: boolean;
    handleClose: () => void;
    deleteItemId: Category|null
  }
  
  export interface EditModalProps {
    isOpen: boolean;
    handleClose: () => void;
    editedRow: Category | null;
    setEditedRow: React.Dispatch<React.SetStateAction<Category | null>>;
  }
  export interface CategoryTableProps {
    data: Category[];
    totalRows: number;
    page: number;
    rowsPerPage: number;
    handleChangePage: (event: unknown, newPage: number) => void;
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleEditClick: (rowData: Category) => void;
    handleDeleteClick: (product: Category) => void;
  }
  export interface TableCellProps {
    value: any; // Adjust the type according to your needs
  }
  
  export interface TablePaginationProps {
    rowsPerPageOptions: number[];
    count: number;
    rowsPerPage: number;
    page: number;
    onPageChange: (event: unknown, newPage: number) => void;
    onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import { setRowsPerPageAndFetch, setPageAndFetch } from '../../redux/productSlice';
// import { Category } from '../types/Category';
import DeleteConfirmationModal from '../DeleteConfirmationModal';
import EditModal from '../EditModal';
import { MutatingDots } from 'react-loader-spinner';
import EditProdcut from './EditProdcut';
import { Product } from '../../types/product';
import DeleteProduct from './DeleteProduct';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const ProdcutTable: React.FC = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [deleteRow, setDeletedRow] = useState<| null>(null);
    const [editedRow, setEditedRow] = useState<| null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

    const columns = [
        { Header: 'ID', accessor: '_id' },
        {
            accessor: 'name',
            Header: 'Product Name',
            Cell: ({ value }: any) => (
                <div className="flex items-center">
                    {value}
                </div>
            ),
        },
        {
            accessor: 'images',
            Header: 'Product Images',
            Cell: ({ value }: any) => (
                <div className="flex items-center">
                    <div className="flex items-center gap-2">
                        {value.map((imageUrl: string, index: number) => (
                            <img
                                key={index}
                                src={`http://localhost:8000${imageUrl}`}
                                alt={`Product Image ${index}`}
                                className="rounded-full h-8 w-8 object-cover"
                            />
                        ))}
                    </div>
                </div>
            ),
        },
        {
            accessor: 'category',
            Header: 'Category Name',
            Cell: ({ value }: any) => (
                <div className="flex items-center">
                    {value?.name}
                </div>
            ),
        },
        {
            accessor: 'price',
            Header: 'Price',
            Cell: ({ value }: any) => (
                <div className="flex items-center">
                    {value}
                </div>
            ),
        },
   
        {
            accessor: 'description',
            Header: 'Description',
            Cell: ({ value }: any) => (
              <div className="flex items-center">
                {value.length > 20 ? (
                  <div title={value} className="flex items-center">
                    {value.slice(0, 20)}...
                  </div>
                ) : (
                  <div>{value}</div>
                )}
              </div>
            ),
          },
          {
            accessor: 'highlights',
            Header: 'Highlights',
            Cell: ({ value }: any) => (
                <div className="flex items-center">
                    {value.map((v:any)=><p>#{v}, </p>)}
                </div>
            ),
        },
          {
            accessor: 'orderQuantity',
            Header: 'Order Quantity',
            Cell: ({ value }: any) => (
                <div className="flex items-center">
                    {value}
                </div>
            ),
        },
          {
            accessor: 'available',
            Header: 'Available',
            Cell: ({ value }: any) => (
              <div className={`flex items-center ${value ? 'text-green-500' : 'text-red-500'}`}>
                {value ? 'Available' : 'Not Available'}
              </div>
            ),
          },

    ];
    const dispatch = useDispatch();
    const categoryState = useSelector((state: RootState) => state.product);
    console.log('Categories:', categoryState);

    const handleChangePage = (_event: unknown, newPage: number) => {
        //@ts-ignore
        dispatch(setPageAndFetch(newPage));
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        //@ts-ignore
        dispatch(setRowsPerPageAndFetch(parseInt(event.target.value, 10)));
    };
    const handleEditClick = (rowData: any) => {
        setEditedRow(rowData);
        console.log("row data", rowData)
        setIsEditModalOpen(true);
    };
    const handlEDeleteClick = (rowData: any) => {
        setDeleteModalOpen(true);
        console.log("ro data for delete.......", rowData)
        setDeletedRow(rowData)
    };
    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setEditedRow(null);
    };
    const getProductValue = (product: any, accessor: string) => {
        const keys = accessor.split('.'); // Split nested keys
        let value: any = { ...product };

        keys.forEach((key) => {
            value = value[key];
        });

        return value;
    };

    // useEffect(() => {
    //     dispatch(fetchCategoriesStart())
    //     //@ts-ignore
    //      dispatch(fetchCategories());
    //   }, [dispatch]);
    return (
        <>

            <EditProdcut
                isOpen={isEditModalOpen}
                handleClose={handleCloseEditModal}
                editedRow={editedRow}
                setEditedRow={setEditedRow}
            />
            <DeleteProduct
                isOpen={deleteModalOpen}
                handleClose={() => setDeleteModalOpen(false)}
                deletedItem={deleteRow}
            />

            <div>
                {
                    !categoryState.loading ?
                        (
                            <TableContainer component={Paper} className="overflow-auto ">
                                <Table sx={{ maxWidth: 1300 }} aria-label="product table" className="border-collapse align-center justify-center mx-auto">
                                    <TableHead className="bg-blue-200 !text-white">
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell key={column.accessor} className={`p-2 !text-md !text-black`}>
                                                    {column.Header}
                                                </TableCell>
                                            ))}
                                            <TableCell className="p-2">Actions</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>

                                        {categoryState?.data && categoryState?.data.map((product, index) => (
                                            <TableRow
                                                key={product._id}
                                                className={index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}
                                            >
                                                {columns.map((column) => (
                                                    <TableCell key={column.accessor} className={`p-2`}>
                                                        {column.Cell ? column.Cell({ value: product[column.accessor as keyof Product] }) : getProductValue(product, column.accessor)}
                                                    </TableCell>
                                                ))}

                                                <TableCell className="p-2">
                                                    <div className="flex justify-between items-center gap-1">

                                                        <button onClick={() => handleEditClick(product)} className="text-blue-600 hover:bg-blue-200 p-1 rounded-full bg-blue-100">
                                                            <EditIcon />
                                                        </button>
                                                        <button onClick={() => handlEDeleteClick(product)} className="text-red-600 hover:bg-red-200 p-1 rounded-full bg-red-100">
                                                            <DeleteIcon />
                                                        </button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>

                                    <TableFooter>
                                        <TableRow>
                                            <TablePagination
                                                rowsPerPageOptions={[5, 10, 25]}
                                                count={categoryState.totalRows}
                                                rowsPerPage={categoryState.rowsPerPage}
                                                page={categoryState.page}
                                                onPageChange={handleChangePage}
                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                                className="mx-auto"
                                            />
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </TableContainer>
                        ) :

                        (
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
                        )}


                <div>

                </div>
            </div>
        </>
    );
};

export default ProdcutTable;

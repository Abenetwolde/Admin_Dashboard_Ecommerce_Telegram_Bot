import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import { setRowsPerPageAndFetch, setPageAndFetch } from '../../redux/orderSlice';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery'
import { MutatingDots } from 'react-loader-spinner';
// import EditProdcut from './EditProdcut';
import { Product } from '../../types/product';
import EditOrder from './EditOrder';

// import DeleteProduct from './DeleteProduct';
// import DeleteUser from '../User/DeleteUser';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const OrderTable: React.FC = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [deleteRow, setDeletedRow] = useState<| null>(null);
    const [editedRow, setEditedRow] = useState<| null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-orange-400';
            case 'completed':
                return 'bg-green-400';
            case 'cancelled':
                return 'bg-red-400';
            case 'delivered':
                return 'bg-blue-400';
            default:
                return '';
        }
    };
    const columns = [
        { Header: 'OrderId', accessor: '_id' },
        {
            accessor: 'orderItems',
            Header: 'Product Name',
            Cell: ({ value }: any) => (
                <div className="flex flex-col items-center">
                     <ul className="list-disc">
                {value.map((p, index) => (
                    <li key={index}>{p?.product?.name}</li>
                ))}
            </ul>
                </div>
            ),
        },
        {
            accessor: 'user',
            Header: 'User Name',
            Cell: ({ value }: any) => (
                <div className="flex items-center">

                    <span>
                        {value?.username}
                    </span>

                </div>
            ),
        },
        {
            accessor: 'orderNumber',
            Header: 'Order Number',
            Cell: ({ value }: any) => (
                <div className="flex items-center">

                    <span>
                        {value&&value}
                    </span>

                </div>
            ),
        },
        {
            accessor: 'user',
            Header: 'User First Name',
            Cell: ({ value }: any) => (
                <div className="flex items-center">

                    <span>
                        {value?.first_name}
                    </span>

                </div>
            ),
        },
        // {
        //     accessor: 'orderItems',
        //     Header: 'Product Images',

        //     Cell: ({ value }: any) => (
        //         <div className="flex items-center">
        //             <div className="flex items-center gap-2">
        //                 {value.map((p: any, index: number) => (


        //                     p.product?.images.slice(0, 1).map((p) => <img
        //                         key={index}
        //                         src={p.imageUrl}
        //                         alt={`Product Image ${index}`}
        //                         className="rounded-full h-8 w-8 object-cover"
        //                     />

        //                     )))}
        //             </div>
        //         </div>
        //     ),
        // },

        // {
        //     accessor: 'orderItems.product.price',
        //     Header: 'Price',
        //     Cell: ({ value }: any) => (
        //         <div className="flex items-center">
        //             {value}
        //         </div>
        //     ),
        // },


        {
            accessor: 'totalPrice',
            Header: 'TotalAmount',
            Cell: ({ value }: any) => (
                <div className="flex items-center">
                    <p>{value}</p>
                </div>
            ),
        },
        {
            accessor: 'orderStatus',
            Header: 'orderStatus',
            Cell: ({ value }: any) => (
                <div className={`flex items-center justify-center p-1 rounded-md text-white ${getStatusColor(value)}`}>
                {value}
            </div>
    
            ),
        },
        {
            accessor: 'paymentType',
            Header: 'Payment Type',
            Cell: ({ value }: any) => (
                <div className="flex items-center">
                    {value}
                </div>
            ),
        },
        {
            accessor: 'paymentStatus',
            Header: 'Payment Status',
            Cell: ({ value }: any) => (
                <div className={`flex items-center justify-center p-1 rounded-md text-white ${getStatusColor(value)}`}>
                {value}
            </div>
    
            ),
        },
        {
            accessor: 'createdAt',
            Header: 'createdAt',
            Cell: ({ value }: any) => (
                <div className={`flex items-center`}>
                   {new Date(value).toLocaleString()}
                </div>
            ),
        },
        {
            accessor: 'shippingInfo',
            Header: 'Note',
            Cell: ({ value }: any) => (
                <div className="flex items-center">
                  {value?.note?.length > 20 ? (
                    <div title={value?.note} className="flex items-center">
                      {value?.note.slice(0, 20)}...
                    </div>
                  ) : (
                    <div>{value?.note}</div>
                  )}
                </div>
              ),
        },
        {
            accessor: 'shippingInfo',
            Header: 'Phone Number',
            Cell: ({ value }: any) => (
                <div className={`flex items-center`}>
                    {value.phoneNo}
                </div>
            ),
        },
        {
            accessor: 'shippingInfo',
            Header: 'Address',
            Cell: ({ value }: any) => (
                <div className="flex items-center">
                  {value?.location?.length > 20 ? (
                    <div title={value.location} className="flex items-center">
                      {value.location.slice(0, 20)}...
                    </div>
                  ) : (
                    <div>{value?.location}</div>
                  )}
                </div>
              ),
        },
        //   {
        //     accessor: 'createdAt',
        //     Header: 'createdAt',
        //     Cell: ({ value }: any) => (
        //       <div className={`flex items-center ${value ? 'text-green-500' : 'text-red-500'}`}>
        //         {value ? 'Available' : 'Not Available'}
        //       </div>
        //     ),
        //   },

    ];
    const dispatch = useDispatch();
    const categoryState = useSelector((state: RootState) => state.order);
    console.log('Categories:', categoryState.data);

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
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.down('md')) // Adjust breakpoint as needed

    // useEffect(() => {
    //     dispatch(fetchCategoriesStart())
    //     //@ts-ignore
    //      dispatch(fetchCategories());
    //   }, [dispatch]);
    return (
        <>



            <EditOrder
                isOpen={isEditModalOpen}
                handleClose={handleCloseEditModal}
                editedRow={editedRow}
                setEditedRow={setEditedRow}
            />
            {/* <DeleteUser
            //    isOpen={deleteModalOpen}
            //    handleClose={() => setDeleteModalOpen(false)}
            //    deletedItem={deleteRow} 
            // /> */}


          
                {
                    !categoryState.loading ?
                        (
                        //  <Scrollbar>
                        <div className="overflow-auto flex item-center justify-center shadow-xl">
                            <TableContainer      sx={{
                                width: { xs: '100%', md: isTablet ? '100%' : '1200px', lg: '1200px' },
                                marginX: { xs: 1, md: isTablet ? 1 : 4, lg: 1 },
                                flexGrow: 1
                            }}component={Paper} className="overflow-auto mx-auto ">
                                <Table sx={{ maxWidth: 1000 }} aria-label="product table" className="border-collapse align-center justify-center mx-auto">
                                    <TableHead >
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell key={column.accessor} className={`p-2 !text-md`}>
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
                                                // className={index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}
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
                            </div>
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
     
        </>
    );
};

export default OrderTable;

import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import { setRowsPerPageAndFetch, setPageAndFetch } from '../../redux/payment';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery'
import { MutatingDots } from 'react-loader-spinner';
// import EditProdcut from './EditProdcut';
import { Product } from '../../types/product';
// import EditOrder from './EditOrder';
import Scrollbar from '../scrollbar';
// import DeleteProduct from './DeleteProduct';
// import DeleteUser from '../User/DeleteUser';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const PaymentTable: React.FC = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [deleteRow, setDeletedRow] = useState<| null>(null);
    const [editedRow, setEditedRow] = useState<| null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending'||'Cash':
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
    const getStatusColorType = (status: string) => {
        switch (status) {
            case 'Cash'||'cash':
                return 'bg-orange-400';
            case 'online'||'Online':
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
<<<<<<< HEAD
        // { Header: 'UserID', accessor: 'telegramid' },
    
        {
            accessor: 'telegramid',
=======
        { Header: 'UserID', accessor: 'telegramid' },
    
        {
            accessor: 'user',
>>>>>>> origin/main
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
<<<<<<< HEAD
            accessor: 'telegramid',
=======
            accessor: 'user',
>>>>>>> origin/main
            Header: 'User First Name',
            Cell: ({ value }: any) => (
                <div className="flex items-center">

                    <span>
                        {value?.first_name}
                    </span>

                </div>
            ),
        },
     



        {
            accessor: 'total_amount',
            Header: 'TotalAmount',
            Cell: ({ value }: any) => (
                <div className="flex items-center">
<<<<<<< HEAD
                    <p>{value/100} ETB</p>
=======
                    <p>{value/100}</p>
>>>>>>> origin/main
                </div>
            ),
        },
        
        {
            accessor: 'invoice_id',
            Header: 'Invoice Id',
            Cell: ({ value }: any) => (
                <div className="flex items-center">
                    <p>{value}</p>
                </div>
            ),
        },
        {
            accessor: 'telegram_payment_charge_id',
            Header: 'telegram_payment_charge_id',
            Cell: ({ value }: any) => (
                <div className="flex items-center">
                    {value}
                </div>
            ),
        },
        {
            accessor: 'order',
<<<<<<< HEAD
            Header: 'Order Status',
            Cell: ({ value }: any) => (
                <div className={`flex items-center justify-center p-1 rounded-md  ${getStatusColor(value?.paymentStatus)}`}>
                    {value?.orderStatus}
=======
            Header: 'Payment Status',
            Cell: ({ value }: any) => (
                <div className={`flex items-center justify-center p-1 rounded-md text-white ${getStatusColor(value?.paymentStatus)}`}>
                    {value?.paymentStatus}
>>>>>>> origin/main
                </div>
            ),
        },
        {
<<<<<<< HEAD
            accessor: 'paymentType',
            Header: 'Payment Method',
            Cell: ({ value }: any) => (
                <div className={`flex items-center justify-center p-1 rounded-md  ${getStatusColorType(value?.paymentType)}`}>
                    {value}
=======
            accessor: 'order',
            Header: 'Payment Method',
            Cell: ({ value }: any) => (
                <div className={`flex items-center justify-center p-1 rounded-md text-white ${getStatusColorType(value?.paymentType)}`}>
                    {value?.paymentType}
>>>>>>> origin/main
                </div>
            ),
        },
        {
            accessor: 'createdAt',
            Header: 'createdAt',
            Cell: ({ value }: any) => (
                <div className={`flex items-center`}>
                    {value}
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
    const categoryState = useSelector((state: RootState) => state.payment);
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



            {/* <EditOrder
                isOpen={isEditModalOpen}
                handleClose={handleCloseEditModal}
                editedRow={editedRow}
                setEditedRow={setEditedRow}
            /> */}
            {/* <DeleteUser
            //    isOpen={deleteModalOpen}
            //    handleClose={() => setDeleteModalOpen(false)}
            //    deletedItem={deleteRow} 
            // /> */}


          
                {
                    !categoryState.loading ?
                        (
                        //  <Scrollbar>
<<<<<<< HEAD
                        <div className="overflow-auto flex item-center justify-center shadow-xl">
=======
>>>>>>> origin/main
                            <TableContainer      sx={{
                                width: { xs: '100%', md: isTablet ? '100%' : '1300px', lg: '1400px' },
                                marginX: { xs: 1, md: isTablet ? 1 : 4, lg: 1 },
                                flexGrow: 1
                            }}component={Paper} className="overflow-auto mx-auto ">
<<<<<<< HEAD
                                <Table  aria-label="product table" className="border-collapse align-center justify-center mx-auto">
                                    <TableHead >
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell key={column.accessor} className={`p-2 !text-md`}>
=======
                                <Table sx={{ maxWidth: 1000 }} aria-label="product table" className="border-collapse align-center justify-center mx-auto">
                                    <TableHead className="bg-blue-200 !text-white">
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell key={column.accessor} className={`p-2 !text-md !text-black`}>
>>>>>>> origin/main
                                                    {column.Header}
                                                </TableCell>
                                            ))}
                                            {/* <TableCell className="p-2">Actions</TableCell> */}
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>

                                        {categoryState?.data && categoryState?.data.map((product, index) => (
                                            <TableRow
                                                key={product._id}
<<<<<<< HEAD
                                                // className={index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}
=======
                                                className={index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}
>>>>>>> origin/main
                                            >
                                                {columns.map((column) => (
                                                    <TableCell key={column.accessor} className={`p-2`}>
                                                        {column.Cell ? column.Cell({ value: product[column.accessor as keyof Product] }) : getProductValue(product, column.accessor)}
                                                    </TableCell>
                                                ))}

                                                {/* <TableCell className="p-2">
                                                    <div className="flex justify-between items-center gap-1">

                                                        <button onClick={() => handleEditClick(product)} className="text-blue-600 hover:bg-blue-200 p-1 rounded-full bg-blue-100">
                                                            <EditIcon />
                                                        </button>
                                                        <button onClick={() => handlEDeleteClick(product)} className="text-red-600 hover:bg-red-200 p-1 rounded-full bg-red-100">
                                                            <DeleteIcon />
                                                        </button>
                                                    </div>
                                                </TableCell> */}
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
<<<<<<< HEAD
                            </div>
=======
                      /* </Scrollbar> */
>>>>>>> origin/main
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

export default PaymentTable;

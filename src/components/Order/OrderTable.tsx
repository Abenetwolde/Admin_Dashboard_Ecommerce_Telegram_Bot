import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Box, Card, CardHeader, Drawer, List, ListItem, ListItemText, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import {  setPaginationData, setPage, setRowsPerPage } from '../../redux/orderSlice';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery'
import VisibilityIcon from '@mui/icons-material/Visibility';
// import EditProdcut from './EditProdcut';
import { Product } from '../../types/product';
import EditOrder from './EditOrder';
import FilterOrder from './FilterOrder';
import { useGetAllOrdersQuery } from '../../redux/Api/Order';
import Label from '../Label';
import { useNavigate } from 'react-router-dom';

// import DeleteProduct from './DeleteProduct';
// import DeleteUser from '../User/DeleteUser';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const OrderTable: React.FC = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [deleteRow, setDeletedRow] = useState<| null>(null);
    const [editedRow, setEditedRow] = useState<| null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const [orderNumber, setSearch] = useState<number>();
    const [sortField, setSortField] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');
    const [orderStatus, setOrderStatus] = useState('');
    const [paymentType, setPaymentType] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);

    const theme = useTheme();
    const navigate = useNavigate();
    const isLight = theme.palette.mode === 'light';
    const renderSkeleton = () => {
        return (
            <TableRow>
                {columns.map((column) => (
                    <TableCell>
                        <Skeleton height={30} variant="text" />
                    </TableCell>
                ))}
                <TableCell>
                    <Skeleton height={30} variant="text" />
                </TableCell>
            </TableRow>
        );
    };
    const columns = [
        // { Header: 'OrderId', accessor: '_id' },
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
       
                <Label
                    variant={isLight ? 'ghost' : 'filled'}
                    color={"info"}>

                    {`@${value?.username}`}
                </Label>
            ),
        },
   
        {
            accessor: 'user',
            Header: 'First Name',
            Cell: ({ value }: any) => (
                <div className="flex items-center">

                    <span>
                        {value?.first_name}
                    </span>

                </div>
            ),
        },
      


        {
            accessor: 'totalPrice',
            Header: 'Total Amount(ETB)',
            Cell: ({ value }: any) => (
                <div className="flex items-center">
                    <p>{value}</p>
                </div>
            ),
        },
        {
            accessor: 'orderStatus',
            Header: 'Order Status',
            Cell: ({ value }: any) => (
                <Label
                variant={isLight ? 'ghost' : 'filled'}
                color={(value == 'completed' && 'success') ||
                    (value == 'pending' && 'warning') ||
                    (value == 'delivered' && 'info') ||
                    'error'}      >

                {value }
            </Label>
    
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
                <Label
                variant={isLight ? 'ghost' : 'filled'}
                color={(value == 'completed' && 'success') ||
                    (value == 'pending' && 'warning') ||
                    'error'}      >

                {value }
            </Label>
    
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


    ];

 
    const dispatch = useDispatch();
    const order = useSelector((state: RootState) => state.order);
    const { data, error, isLoading, refetch } = useGetAllOrdersQuery({
        page: order.page + 1, // Convert 0-based to 1-based indexing for the backend
        pageSize: order.rowsPerPage, 
        orderNumber, 
        // sortField, 
        sortOrder, 
         orderStatus, 
        paymentType,
        paymentStatus
    });

    useEffect(() => {
        if (data) {
            dispatch(setPaginationData({ totalPages: data.totalPages, totalRows: data.count }));
        }
    }, [data, dispatch]);

    const handleChangePage = (_event: unknown, newPage: number) => {
        dispatch(setPage(newPage));
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
        dispatch(setPage(0)); // Reset to first page
    };
    const handleEditClick = (rowData: any) => {
        setEditedRow(rowData);
      
        setIsEditModalOpen(true);
    };
    const handlEDeleteClick = (rowData: any) => {
        setDeleteModalOpen(true);

        setDeletedRow(rowData)
    };
    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setEditedRow(null);
    };
    const handleOrderStatus = (e) => {
        setOrderStatus(e.target.value)
        refetch()
    };
    const handlePaymentMethod = (e) => {
        setPaymentType(e.target.value)
        refetch()
    };
    const handlePaymentStatus = (e) => {
        setPaymentStatus(e.target.value)
        refetch()
    };
    const getProductValue = (product: any, accessor: string) => {
        const keys = accessor.split('.'); // Split nested keys
        let value: any = { ...product };

        keys.forEach((key) => {
            value = value[key];
        });

        return value;
    };

    const isTablet = useMediaQuery(theme.breakpoints.down('md')) // Adjust breakpoint as needed
    const handleViewClick = async (order: any) => {


        setSelectedOrder(order);
        setDrawerOpen(true);
        // await UpdateFeedbackStatus({ id: feedback?._id }).unwrap()

    };
    
    const handleDrawerClose = () => {
        setDrawerOpen(false);
        setSelectedOrder(null);
        
    };

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


          
              
                        <div className="overflow-auto flex item-center justify-center shadow-xl">
                              <Card className='p-5'elevation={2}>
                              <CardHeader  title={"Orders Table"} />
                              <FilterOrder
                                            search={orderNumber}
                                            paymentStatus={paymentStatus}
                                            sortOrder={sortOrder}
                                            orderStatus={orderStatus}
                                            paymentType={paymentType}
                                            // setPaymentType={setPaymentType}
                                            handleSearchChange={(e) => setSearch(e.target.value)}
                                            handleSortChange={(e) => setSortField(e.target.value)}
                                            handleSortOrderChange={(e) => setSortOrder(e.target.value)}
                                            handleOrderStatusChange={(e) => handleOrderStatus(e)}
                                             handlePaymentTypeChange={(e) => handlePaymentMethod(e)}
                                             handlePaymentStatusChange={(e) => handlePaymentStatus(e)}
                              />
                            <TableContainer component={Paper} className="overflow-auto mx-auto ">
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

                                          {isLoading
                                    ? Array.from(new Array(7)).map((_, index) => renderSkeleton()):
                                    data&& data?.orders.map((product, index) => (
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
                                                    <button onClick={() => handleViewClick(product)} className="text-green-600 hover:bg-green-200 p-1 rounded-full bg-green-100">
                                                        <VisibilityIcon />
                                                        </button>
                                                        <button onClick={() => handleEditClick(product)} className="text-blue-600 hover:bg-blue-200 p-1 rounded-full bg-blue-100">
                                                            <EditIcon />
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
                                                count={order?.totalRows||0}
                                                rowsPerPage={order?.rowsPerPage}
                                                page={order?.page}
                                                onPageChange={handleChangePage}
                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                                className="mx-auto"
                                            />
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </TableContainer>
                            </Card>
                            </div>
      

                            <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
                        <Box sx={{ width: 350, p: 3 }}>
                            <Typography variant="h6">User Order Detail</Typography>
                            {selectedOrder && (
                                <List>
                                     <ListItem>
                                        <ListItemText primary="Order ID" secondary={selectedOrder?.orderNumber} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="First Name" secondary={selectedOrder?.user?.first_name} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Username" secondary={selectedOrder?.user?.username} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Total Amount(ETB)" secondary={selectedOrder?.totalPrice} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Order Status" secondary={selectedOrder?.orderStatus} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Payment Type" secondary={selectedOrder?.paymentType} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Note" secondary={selectedOrder?.shippingInfo?.note} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Phone Number" secondary={selectedOrder?.shippingInfo?.phoneNo} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Address" secondary={selectedOrder?.shippingInfo?.location} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="createdAt" secondary={selectedOrder?.createdAt} />
                                    </ListItem>
                                </List>
                            )}
                            {/* <TextField
                                label="Reply"
                                multiline
                                rows={4}
                                value={selectedOrder?.reply ? selectedOrder?.reply : reply}
                                // value={reply}
                                onChange={(e) => setReply(e.target.value)}
                                variant="outlined"
                                fullWidth
                                sx={{ mt: 2 }}
                            /> */}
                            {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                <Button variant="contained" color="primary" onClick={() => handleSendReply(selectedFeedback?._id, reply)}>

                                   {sendingLoading?'Sending...':'Send'} 
                                </Button>
                            </Box> */}
                        </Box>
                    </Drawer>


            <div>

            </div>
     
        </>
    );
};

export default OrderTable;

import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Card, CardHeader, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import { setPaymentPage, setPaymentPaginationData, setPaymentRowsPerPage } from '../../redux/payment';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery'
import { MutatingDots } from 'react-loader-spinner';
import { Product } from '../../types/product';

import { useGetPaymentsQuery } from '../../redux/Api/payment';
import Label from '../Label';

const PaymentTable: React.FC = () => {
    const [sortOrder, setSortOrder] = useState('desc');
    const [orderStatus, setOrderStatus] = useState('');
    const [paymentType, setPaymentType] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    const payment = useSelector((state: RootState) => state.payment);
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
    const { data, error, isLoading, refetch } = useGetPaymentsQuery({
        page: payment.page + 1, // Convert 0-based to 1-based indexing for the backend
        pageSize: payment.rowsPerPage,

        sortOrder, 
         orderStatus, 
        paymentType,
    paymentStatus
    });
    const theme = useTheme();

    const isLight = theme.palette.mode === 'light';
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending' || 'Cash':
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
            case 'Cash' || 'cash':
                return 'bg-orange-400';
            case 'online' || 'Online':
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
        // { Header: 'UserID', accessor: 'telegramid' },

        {
            accessor: 'telegramid',
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
            accessor: 'telegramid',
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
                    <p>{value / 100} ETB</p>
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
            Header: 'Order Status',
            Cell: ({ value }: any) => (
                <Label
                    variant={isLight ? 'ghost' : 'filled'}
                    color={(value?.orderStatus == 'completed' && 'success') ||
                        (value?.orderStatus == 'pending' && 'warning') ||
                        (value?.orderStatus == 'delivered' && 'info') ||
                        'error'}      >

                    {value?.orderStatus}
                </Label>
            ),
        },
        {
            accessor: 'order',
            Header: 'Payment Status',
            Cell: ({ value }: any) => (
                <Label
                    variant={isLight ? 'ghost' : 'filled'}
                    color={(value?.paymentStatus == 'completed' && 'success') ||
                        (value?.paymentStatus == 'pending' && 'warning') ||
                        (value?.paymentStatus == 'delivered' && 'info') ||
                        'error'}      >

                    {value?.paymentStatus}
                </Label>
            ),
        },
        {
            accessor: 'paymentType',
            Header: 'Payment Method',
            Cell: ({ value }: any) => (
                <div className={`flex items-center justify-center p-1 rounded-md  ${getStatusColorType(value?.paymentType)}`}>
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


    ];
    const dispatch = useDispatch();
    useEffect(() => {
        if (data) {
            dispatch(setPaymentPaginationData({ totalPages: data.totalPages, totalRows: data.count }));
        }
    }, [data, dispatch]);
    const handleChangePage = (_event: unknown, newPage: number) => {
        //@ts-ignore
        dispatch(setPaymentPage(newPage));

    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPaymentRowsPerPage(parseInt(event.target.value, 10)));
        dispatch(setPaymentPage(0));
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
    return (
        <>

            <div className="overflow-auto flex item-center justify-center shadow-xl">
                <Card className='p-5' elevation={2}>
                    <CardHeader title={"Payments Table"} />
                    {/* <FilterOrder
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
                              /> */}
                    <TableContainer  component={Paper} className="overflow-auto mx-auto ">
                        <Table aria-label="product table" className="border-collapse align-center justify-center mx-auto">
                            <TableHead >
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell key={column.accessor} className={`p-2 !text-md`}>
                                            {column.Header}
                                        </TableCell>
                                    ))}
                                    {/* <TableCell className="p-2">Actions</TableCell> */}
                                </TableRow>
                            </TableHead>

                            <TableBody>

                                {isLoading
                                    ? Array.from(new Array(7)).map((_, index) => renderSkeleton()) :
                                    data && data?.payments?.map((product, index) => (
                                        <TableRow
                                            key={product._id}
                                        // className={index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}
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
                                        count={payment.totalRows}
                                        rowsPerPage={payment.rowsPerPage}
                                        page={payment.page}
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




            <div>

            </div>

        </>
    );
};

export default PaymentTable;

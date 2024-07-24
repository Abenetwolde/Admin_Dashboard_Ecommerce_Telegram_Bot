import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Card, CardHeader, FormControl, InputLabel, MenuItem, Paper, Select, Skeleton, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField } from '@mui/material';
import { setPage, setPaginationData, setRowsPerPage } from '../../redux/userSlice';

import { MutatingDots } from 'react-loader-spinner';
import EditProdcut from './EditUser';
import { Product } from '../../types/product';
import DeleteProduct from './DeleteUser';
import { useGetUsersQuery } from '../../redux/Api/User';
import UserFilter from './UserFilter.tsx';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const UserTable: React.FC = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [deleteRow, setDeletedRow] = useState<| null>(null);
    const [editedRow, setEditedRow] = useState<| null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const [search, setSearch] = useState('');
    const [sortField, setSortField] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('asc');
    const [joinMethod, setJoinMethod] = useState('');
    const [role, setRole] = useState('');
    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        // setPage(0);
    };

    const handleSortChange = (event) => {
        setSortField(event.target.value);
    };

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
    };

    const handleJoinMethodChange = (event) => {
        setJoinMethod(event.target.value);
    };

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };
    const columns = [
        // { Header: 'ID', accessor: '_id' , width:20},
        {
            accessor: 'telegramid',
            Header: 'Telegram ID',
            Cell: ({ value }: any) => (
                <div className="flex items-center">
                    {value}
                </div>
            ),
        },

        {
            accessor: 'first_name',
            Header: 'First Name',
            Cell: ({ value }: any) => (
                <div className="flex items-center">
                    {value && value}
                </div>
            ),
        },
        {
            accessor: 'Last Name',
            Header: 'last_name',
            Cell: ({ value }: any) => (
                <div className="flex items-center">
                    {value && value}
                </div>
            ),
        },
        {
            accessor: 'username',
            Header: 'User Name',
            Cell: ({ value }: any) => (
                <div className="flex items-center">
                    {value && value}
                </div>
            ),
        },
        {
            accessor: 'language',
            Header: 'Language',
            Cell: ({ value }: any) => (
                <div className="flex items-center">
                    {value && value}
                </div>
            ),
        },
        {
            accessor: 'from',
            Header: 'Registerd From',
            Cell: ({ value }: any) => (
                <div className="flex items-center">
                    {value && value}
                </div>
            ),
        },
        {
            accessor: 'is_bot',
            Header: 'Is Bot',
            Cell: ({ value }: any) => (
                <div className="flex items-center">
                    {value && value ? "True" : "false"}
                </div>
            ),
        },
        {
            accessor: 'role',
            Header: 'Role',
            Cell: ({ value }: any) => (
                <div className="flex items-center">
                    {value && value}
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
    const user = useSelector((state: RootState) => state.user);
    const { data, error, isLoading } = useGetUsersQuery({
        page: user.page+1, pageSize: user.rowsPerPage,
        search,
        sortField,
        sortOrder,
        joinMethod,
        role,
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
    };
    const handleEditClick = (rowData: any) => {
        setEditedRow(rowData);
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

    const renderSkeleton = () => {
        return (
            <TableRow>
                {columns.map((column) => (
                    <TableCell key={column.accessor}>
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
        <> <EditProdcut
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


<div className='mt-5 p-3'>
             
             <Card>
             <CardHeader  title={"Users Table"} />
            <UserFilter
        search={search}
        sortField={sortField}
        sortOrder={sortOrder}
        joinMethod={joinMethod}
        role={role}
        handleSearchChange={handleSearchChange}
        handleSortChange={handleSortChange}
        handleSortOrderChange={handleSortOrderChange}
        handleJoinMethodChange={handleJoinMethodChange}
        handleRoleChange={handleRoleChange}
      />
            <TableContainer component={Paper} className="overflow-auto ">
                <Table sx={{ maxWidth: 1200 }} aria-label="product table" className="border-collapse align-center justify-center mx-auto">
                    <TableHead>
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
                            ? Array.from(new Array(user.rowsPerPage)).map((_, index) => renderSkeleton())
                            : data && data?.users?.map((product) => (
                                <TableRow key={product._id}>
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
                                count={user.totalRows}
                                rowsPerPage={user.rowsPerPage}
                                page={user.page}
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

        </>
    );
};

export default UserTable;

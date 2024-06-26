import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import { setRowsPerPageAndFetch, setPageAndFetch } from '../../redux/userSlice';

import { MutatingDots } from 'react-loader-spinner';
import EditProdcut from './EditUser';
import { Product } from '../../types/product';
import DeleteProduct from './DeleteUser';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const UserTable: React.FC = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [deleteRow, setDeletedRow] = useState<| null>(null);
    const [editedRow, setEditedRow] = useState<| null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

    const columns = [
        { Header: 'ID', accessor: '_id' },
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
                    {value&&value}
                </div>
            ),
        },
        {
            accessor: 'Last Name',
            Header: 'last_name',
            Cell: ({ value }: any) => (
                <div className="flex items-center">
                    {value&&value}
                </div>
            ),
        },
        {
            accessor: 'username',
            Header: 'User Name',
            Cell: ({ value }: any) => (
                <div className="flex items-center">
                    {value&&value}
                </div>
            ),
        },
        {
            accessor: 'language',
            Header: 'Language',
            Cell: ({ value }: any) => (
                <div className="flex items-center">
                    {value&&value}
                </div>
            ),
        },
        {
            accessor: 'from',
            Header: 'Registerd From',
            Cell: ({ value }: any) => (
                <div className="flex items-center">
                    {value&&value}
                </div>
            ),
        },
        {
            accessor: 'is_bot',
            Header: 'Is Bot',
            Cell: ({ value }: any) => (
                <div className="flex items-center">
                    {value&&value?"True":"false"}
                </div>
            ),
        },
        {
            accessor: 'role',
            Header: 'Role',
            Cell: ({ value }: any) => (
                <div className="flex items-center">
                    {value&&value}
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
    console.log('user:', user);

    const handleChangePage = (_event: unknown, newPage: number) => {
        //@ts-ignore
        console.log("niew page....",newPage)
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
                    !user.loading ?
                        (
                            <div className="overflow-auto flex item-center justify-center shadow-xl">
                             
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

                                        {user?.data && user?.data.map((product, index) => (
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
            </div>
        </>
    );
};

export default UserTable;

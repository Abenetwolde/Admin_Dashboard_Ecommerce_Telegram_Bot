import React from 'react';
import { Box, Button, Card, CardHeader, Divider, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, useTheme } from '@mui/material';
import LoadingIndicator from '../LoadingIndicator';
// import Scrollbar from '../Scrollbar';
import Iconify from '../Iconify';
import Scrollbar from '../Scrollbar';
import Label from '../Label';
import FilterButtonGroup from '../FilterButtonGroup';
import UserPerformanceIndicator from './UserPerformanceIndicator';
import { useNavigate } from 'react-router-dom';

interface UserPerformanceProps {
    data: Array<any>;
    loading: boolean;
    filterUserPerformanceTable: any;
    handleFilterUserPerformanceTable: any;
    isFalse: boolean;
    handelSearch:any
    handelLimit:any;
    handelPage:any;
}

const UserPerformance: React.FC<UserPerformanceProps> = ({ data, loading, filterUserPerformanceTable,handelSearch, handleFilterUserPerformanceTable, handelLimit,handelPage,isFalse }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isLight = theme.palette.mode === 'light';
    const columns = [
        //   {
        //     accessor: 'user.user.telegramid',
        //     Header: 'Telegram ID',
        //     Cell: ({ value }: any) => (
        //         <div className="flex items-center">
        //             {value}
        //         </div>
        //     ),
        // },
        {
            accessor: 'user',
            Header: 'First Name',
            Cell: ({ value }: any) => (
                <div className="flex items-center">
                    {value?.user?.first_name}
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

                    {`@${value?.user?.last_name}`}
                </Label>

            ),
        },
        {
            accessor: 'timeSpent',
            Header: 'Time Spent',
            Cell: ({ value }: any) => (
                <div className="flex items-center">
                    {`${value.toFixed(2)} min`}
                </div>
            ),
        },
        {
            accessor: 'totalClicks',
            Header: 'Total Clicks',
            Cell: ({ value }: any) => (
                <div className="flex items-center">
                    {value}
                </div>
            ),
        },
        {
            accessor: 'totalOrders',
            Header: 'Total Orders',
            Cell: ({ value }: any) => (
                <div className="flex items-center">
                    {value}
                </div>
            ),
        },

        {
            accessor: 'overallScore',
            Header: 'Overall Score',
            Cell: ({ value }: any) => (
                <Label
                    variant={isLight ? 'ghost' : 'filled'}
                    color={(value >= 0.70 && 'success') ||
                        (value >= 0.30 && 'warning') ||
                        'error'}      >

                    {`${value * 100}%`}
                </Label>
            ),
        },
    ];

    const getNestedValue = (data: any, accessor: string) => {
        const keys = accessor.split('.');
        let value = data;
        keys.forEach(key => {
            value = value[key];
        });
        return value;
    };
    const handleChangeSearch = (event) => {
        // Your search handler function
        const value = event.target.value;
        console.log(value); // Replace with actual search handling logic
    };
    const tableData = isFalse ? data?.users : data;
    console.log("Table data",tableData)
    return (
        <div className='mt-5'>


            <Card>
                <Box sx={{ mb: 3, textAlign: 'left' }}>
                    <CardHeader sx={{ mb: 3, textAlign: 'left' }} title={!isFalse?`Top 3 Perform User`:`Users Performance`}  sx={{ mb: 3 }} />
                </Box>


                <UserPerformanceIndicator />
                <Box className={`flex items-center ${isFalse? `justify-between`:`justify-end` } `}sx={{ mb: 3, mx: 5 }}>
                    {/* <Box></Box> */}
                    {isFalse&&<TextField
                        size="small"
                        placeholder="Search Users..."
                        onChange={handelSearch}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Iconify icon={'eva:search-fill'} sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }} />
                                </InputAdornment>
                            ),
                        }}
                    />}
                    <FilterButtonGroup handlefilter={handleFilterUserPerformanceTable} filter={filterUserPerformanceTable} />
                </Box>


                {
                    !loading ? <TableContainer  className="overflow-auto " >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell key={column.accessor} className={`p-2 !text-md`}>
                                            {column.Header}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableData.length ? tableData.map((item, index) => (
                                    <TableRow key={index}>
                                        {columns.map((column) => (
                                            <TableCell key={column.accessor} className="p-2">
                                                {column.Cell({ value: getNestedValue(item, column.accessor) })}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                )) :
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="p-2" align="center">
                                            No data
                                        </TableCell>
                                    </TableRow>
                                }
                            </TableBody>
                  {       isFalse&&   <TableFooter>
                                        <TableRow>
                                            <TablePagination
                                                rowsPerPageOptions={[1,2,3,4]}
                                                count={data?.totalUsers}
                                                rowsPerPage={data?.totalPages-1}
                                                page={data?.currentPage}
                                                onPageChange={handelPage}
                                                onRowsPerPageChange={handelLimit}
                                                className="mx-auto"
                                            />
                                        </TableRow>
                                    </TableFooter>}
                        </Table>
                    </TableContainer> :
                        (
                            <LoadingIndicator />
                        )
                }


                <Divider /> 

                {!isFalse && <Box sx={{ p: 2, textAlign: 'right', border: 'none', outline: "none" }}>
                    <Button onClick={() => navigate('/dashboard/users/performance')} sx={{
                        '&:focus': {
                            outline: 'none',
                        },
                    }} size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
                        View All
                    </Button>
                </Box>}
            </Card>


        </div>
    );
};

export default UserPerformance;

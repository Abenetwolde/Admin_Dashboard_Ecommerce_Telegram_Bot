import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardHeader, Divider, InputAdornment, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, useTheme } from '@mui/material';
import LoadingIndicator from '../LoadingIndicator';
// import Scrollbar from '../Scrollbar';
import Iconify from '../Iconify';
import Scrollbar from '../Scrollbar';
import Label from '../Label';
import FilterButtonGroup from '../FilterButtonGroup';
import UserPerformanceIndicator from './UserPerformanceIndicator';
import { useNavigate } from 'react-router-dom';
import { useGetPerformanceQuery } from '../../redux/Api/userKpiSlice';
import useIntersectionObserver from '../../redux/Api/utils/useIntersectionObserver';
interface UserPerformanceProps {
    isFalse: boolean;
}

const UserPerformance: React.FC<UserPerformanceProps> = ({ isFalse=true }) => {
    const [ref, isVisible] = useIntersectionObserver();
    const [filterUserPerformanceTable, setFilterUserPerformance] = useState('perMonth');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [limit, setPageSize] = useState(10);
 const {data, isLoading, refetch, error}:any=   useGetPerformanceQuery({ page: page+1 , limit:!isFalse?3:limit, search, interval: filterUserPerformanceTable }, { skip: !isVisible })
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
 const handleFilterUserPerformanceTable = (newFilter) => {
    setFilterUserPerformance(newFilter);
    console.log(newFilter)
    refetch()
};

const handleSearch = (event) => {
    setSearch(event.target.value);
    refetch()
};

const handlePageChange = (event, newPage) => {
    setPage(newPage);
    refetch()
};

const handleRowsPerPageChange = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
    refetch()
};
    const theme = useTheme();
    const navigate = useNavigate();
    const isLight = theme.palette.mode === 'light';
    const columns = [
 
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
 
    const tableData = data?.users 
    useEffect(() => {
        if (isVisible) {
          refetch();
        }
      }, [isVisible, refetch]);
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
                        onChange={handleSearch}
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


<TableContainer  className="overflow-auto " >
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
                            <TableBody ref={ref}>
                                {isLoading?  Array.from(new Array(3)).map((_, index) => renderSkeleton()):
                                tableData?.length ? tableData.map((item, index) => (
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
                                                onPageChange={handlePageChange}
                                                onRowsPerPageChange={handleRowsPerPageChange}
                                                className="mx-auto"
                                            />
                                        </TableRow>
                                    </TableFooter>}
                        </Table>
                    </TableContainer> 


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

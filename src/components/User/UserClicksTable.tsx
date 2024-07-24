// src/components/UserClicksTable.tsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
import {
    Box,
    Grid,
    InputAdornment,
    Paper,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Drawer,
    IconButton,
    Typography,
    List,
    ListItem,
    ListItemText,
    Card,
    CardHeader,
} from '@mui/material';
import { setPageClick, setPaginationDataClick, setRowsPerPageClick } from '../../redux/userSlice';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useGetUserClicksQuery } from '../../redux/Api/User';
import FilterButtonGroup from '../FilterButtonGroup';
import Iconify from '../Iconify';
// import { useGetUserClicksQuery } from '../redux/Api/User';
// import LoadingIndicator from './LoadingIndicator';

const UserClicksTable: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);
    const [filter, setFilter] = useState('perMonth')
    const [search, setSearch] = useState('');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const handleFiletr = (string) => {
        setFilter(string)
    }
    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        // setPage(0);
    };

    const { data, error, isLoading } = useGetUserClicksQuery({
        page: user.clickpage + 1,
        pageSize: user.clickrowsPerPage,
        search,
        interval: filter
    });

    useEffect(() => {
        if (data) {
            dispatch(setPaginationDataClick({ totalPages: data.totalPages, totalRows: data.totalRecords }));
        }
    }, [data, dispatch]);

    const handleChangePage = (_event: unknown, newPage: number) => {
        dispatch(setPageClick(newPage));
        console.log("iser newPage when the user is newPage", newPage)
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setRowsPerPageClick(parseInt(event.target.value, 10)));
    };

    const sceneNames = data?.clicksPerScene?.flatMap(item => item.userinformationperScene.map(scene => scene.sceneName)) || [];
    const uniqueSceneNames = Array.from(new Set(sceneNames));
    const handleViewClick = (user: any) => {
        setSelectedUser(user);
      
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
        setSelectedUser(null);
    };
    const columns = [
        {
            accessor: 'userInformation',
            Header: 'First Name',
            Cell: ({ value }: any) => <div>{value?.first_name}</div>,
        },
        {
            accessor: 'userInformation',
            Header: 'User Name',
            Cell: ({ value }: any) => <div>{value?.username}</div>,
        },
        ...uniqueSceneNames.slice(0, 4).map(sceneName => ({
            accessor: sceneName,
            Header: sceneName,
            Cell: ({ value }: any) => value || 0,
        })),
        {
            accessor: 'totalClicks',
            Header: 'Total',
            Cell: ({ value }: any) => <div>{value}</div>,
        },
        // {
        //     accessor: 'actions',
        //     Header: 'Actions',
        //     Cell: ({  row }: any) => (
        //         <IconButton onClick={() => handleViewClick(row)}>
        //             <VisibilityIcon />
        //         </IconButton>
        //     ),
        // },
    ];

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
    const getSceneClicks = (userinformationperScene: any[], sceneName: string) => {
        const scene = userinformationperScene.find(scene => scene.sceneName === sceneName);
        return scene ? scene.totalClicks : 0;
    };

    return (
        <div className='mt-5'>
             
        <Card>
        <CardHeader  title={"User Clicks Table"} />
            <Box mt={1}>
                <Grid container py={5} px={10} spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid item xs={12} md={6} lg={6} xl={6} >
                        <TextField
                            size="small"
                            value={search}
                            placeholder="Search users"
                            onChange={handleSearchChange}
                            variant="outlined"

                            fullWidth
                            InputProps={{
                                startAdornment: <InputAdornment position="start">
                                    <Iconify
                                        icon={'eva:search-fill'}
                                        sx={{ color: 'text.disabled', width: 20, height: 20 }}
                                    />
                                </InputAdornment>,
                            }}

                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} xl={6} >
                        <FilterButtonGroup handlefilter={handleFiletr} filter={filter} />
                    </Grid>

                </Grid>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell key={column.accessor}>
                                        {column.Header}
                                    </TableCell>
                                ))}
                                <TableCell className="p-2">Actions</TableCell>
                            </TableRow>
                            

                        </TableHead>
                        <TableBody>

                            {isLoading
                                ? Array.from(new Array(user.rowsPerPage)).map((_, index) => renderSkeleton())
                                : data?.clicksPerScene.map((click) => (
                                    <TableRow key={click.telegramid}>
                                        {columns.map((column) => (
                                            <TableCell key={column.accessor}>
                                                {column.accessor === 'userInformation' || column.accessor === 'totalClicks'
                                                    ? column.Cell({ value: click[column.accessor as keyof typeof click] })
                                                    : column.Cell({ value: getSceneClicks(click.userinformationperScene, column.accessor) })}
                                            </TableCell>
                                        ))}
                                                 <TableCell className="p-2">
                                        <IconButton onClick={() => handleViewClick(click)}>
                                            <VisibilityIcon />
                                        </IconButton>
                                        </TableCell>
                                    </TableRow>

                                ))}
                        </TableBody>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            count={user.clicktotalRows}
                            rowsPerPage={user.clickrowsPerPage}
                            page={user.clickpage}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Table>
                </TableContainer>
                <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
                    <Box sx={{ width: 350, p: 3 }}>
                        <Typography variant="h6">User Clicks Detail</Typography>
                        {selectedUser && (
                            <List>
                                <ListItem>
                                    <ListItemText primary="First Name" secondary={selectedUser.userInformation.first_name} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Username" secondary={selectedUser.userInformation.username} />
                                </ListItem>

                                {uniqueSceneNames.map((sceneName) => (
                                    <ListItem key={sceneName}>
                                        <ListItemText
                                            primary={sceneName}
                                            secondary={getSceneClicks(selectedUser.userinformationperScene, sceneName)}
                                        />
                                    </ListItem>
                                ))}
                                      <ListItem>
                                    <ListItemText primary="Total Clicks" secondary={selectedUser.totalClicks} />
                                </ListItem>
                            </List>
                        )}
                    </Box>
                </Drawer>
            </Box>
            </Card>
        </div>
    );
};

export default UserClicksTable;

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
import { setPageTime,setRowsPerPageTime,setPaginationDataTime } from '../../redux/userSlice';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useGetUserClicksQuery, useGetUserTimesQuery } from '../../redux/Api/User';
import FilterButtonGroup from '../FilterButtonGroup';
import Iconify from '../Iconify';
// import { useGetUserClicksQuery } from '../redux/Api/User';
// import LoadingIndicator from './LoadingIndicator';

const UserTimesTable: React.FC = () => {
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

    const { data, error, isLoading } = useGetUserTimesQuery({
        page: user.timepage + 1,
        pageSize: user.timerowsPerPage,
        search,
        interval: filter
    });

    useEffect(() => {
        if (data) {
            dispatch(setPaginationDataTime({ totalPages: data.totalPages, totalRows: data.totalRecords }));
        }
    }, [data, dispatch]);

    const handleChangePage = (_event: unknown, newPage: number) => {
        console.log("iser newPage when the user is newPage", newPage)
        dispatch(setPageTime(newPage));

    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setRowsPerPageTime(parseInt(event.target.value, 10)));
    };

    const sceneNames = data?.timeSpentPerScene?.flatMap(item => item?.scenes.map(scene => scene.sceneName)) || [];
    const uniqueSceneNames = Array.from(new Set(sceneNames));
    const handleViewClick = (user: any) => {
        setSelectedUser(user);
        console.log("iser click when the user is click", user)
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
        setSelectedUser(null);
    };
    const columns = [
        {
            accessor: 'user',
            Header: 'First Name',
            Cell: ({ value }: any) => (
              <div className="flex items-center">
                {value?.first_name}
              </div>
            ),
          },
          {
              accessor: 'user',
              Header: 'User Name',
              Cell: ({ value }: any) => (
                <div className="flex items-center">
                  {value?.username}
                </div>
              ),
            },
            ...sceneNames.slice(0, 4).map(sceneName => ({
            accessor: sceneName,
            Header: sceneName,
            Cell: ({ value }: any) => value.toFixed(2) || 0,
        })),
        {
            accessor: 'totalSpentTimeInMinutes',
            Header: 'Total',
            Cell: ({ value }: any) => (
              <div className="flex items-center">
                {`${value.toFixed(2)} min`}
              </div>
            ),
          },
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
    const getSceneDuration = (scenes: any[], sceneName: string) => {
        const scene = scenes.find(scene => scene.sceneName === sceneName);
        return scene ? scene.totalDuration : 0;
    };
    const getSceneTime = (userinformationperScene: any[], sceneName: string) => {
        const scene = userinformationperScene.find(scene => scene.sceneName === sceneName);
        return scene ? scene.totalDuration.toFixed(2) : 0;
    };
    return (
        <div className='mt-5'>
             
        <Card>
        <CardHeader  title={"User Time Spent Table"} />
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
                                : data?.timeSpentPerScene?.map((click) => (
                                    <TableRow key={click._id}>
                                        {columns.map((column) => (
                                            <TableCell key={column.accessor}>
                                                {column.accessor === 'user' || column.accessor === 'totalSpentTimeInMinutes'
                                                    ? column.Cell({ value: click[column.accessor as keyof typeof click] })
                                                    : column.Cell({ value: getSceneDuration(click.scenes, column.accessor) })}
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
                            count={user.timetotalRows}
                            rowsPerPage={user.timerowsPerPage}
                            page={user.timepage}
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
                                    <ListItemText primary="First Name" secondary={selectedUser?.user?.first_name} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Username" secondary={selectedUser?.user?.username} />
                                </ListItem>

                                {uniqueSceneNames.map((sceneName) => (
                                    <ListItem key={sceneName}>
                                        <ListItemText
                                            primary={sceneName}
                                            secondary={getSceneTime(selectedUser.scenes, sceneName)}
                                        />
                                    </ListItem>
                                ))}
                                      <ListItem>
                                    <ListItemText primary="Total Time" secondary={selectedUser.totalSpentTimeInMinutes} />
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

export default UserTimesTable;

// src/components/UserClicksTable.tsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    Button,
    useTheme,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Iconify from '../components/Iconify';
import { useGetAllFeedBackQuery, useGetUpdateFeedbackStatusMutation, useReplyFeedbackMutation } from '../redux/Api/feedback';
import Label from '../components/Label';

// import { useGetUserClicksQuery } from '../redux/Api/User';
// import LoadingIndicator from './LoadingIndicator';

const FeedBackPage: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);
    const [filter, setFilter] = useState('perMonth')
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState('');

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedFeedback, setSelectedFeedback] = useState<any>(null);
    const [reply, setReply] = useState('');
    const [replyFeedback, { isLoading :sendingLoading}] = useReplyFeedbackMutation();
    const [UpdateFeedbackStatus] = useGetUpdateFeedbackStatusMutation();
    const handleFiletr = (string) => {
        setFilter(string)
    }
    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        // setPage(0);
    };

    const { data, isLoading: loadingForFeedback } = useGetAllFeedBackQuery({ page: page + 1, limit: rowsPerPage, search });

    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';

    const columns = [
        {
            id: 'firstName',
            label: 'First Name',
            render: (feedback: any) => <TableCell>{feedback.user.first_name}</TableCell>,
        },
        {
            id: 'userName',
            label: 'User Name',
            render: (feedback: any) => <TableCell>{          <Label
                variant={isLight ? 'ghost' : 'filled'}
                color={"info"}>

                {`${feedback?.user?.username?`@ ${feedback?.user?.username} `:'no username'}`}
            </Label>}</TableCell>,
        },
        {
            id: 'feedback',
            label: 'Feedback',
            render: (feedback: any) => <TableCell>{feedback?.feedback.length>20?`${feedback?.feedback?.slice(0, 40)}...`:feedback.feedback}</TableCell>,
        },
        {
            id: 'isRead',
            label: 'isRead',
            render: (feedback: any) => <TableCell>
                <Label
                    variant={isLight ? 'ghost' : 'filled'}
                    color={(feedback?.isRead ? 'success' : 'warning')}>
                    {feedback?.isRead ? 'Yes' : 'No'}
                </Label></TableCell>,
        },
        {
            id: 'isReply',
            label: 'isReply',
            render: (feedback: any) => <TableCell>  <Label
                variant={isLight ? 'ghost' : 'filled'}
                color={(feedback?.isReply ? 'success' : 'warning')}>
                {feedback?.isReply ? 'Yes' : 'No'}
            </Label></TableCell>,
        },

        {
            id: 'actions',
            label: 'Actions',
            render: (feedback: any) => (
                <TableCell>
                    <IconButton onClick={() => handleViewClick(feedback)}>
                        <VisibilityIcon />
                    </IconButton>
                </TableCell>
            ),
        },
    ];
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
    const handleViewClick = async (feedback: any) => {


        setSelectedFeedback(feedback);
        setDrawerOpen(true);
        await UpdateFeedbackStatus({ id: feedback?._id }).unwrap()

    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
        setSelectedFeedback(null);
        setReply('');
    };

    const handleSendReply = async (id: any, reply: string) => {
        try {
            await replyFeedback({ id, reply }).unwrap();
            setReply('');
            toast.success('Feedback has been sent successfully');
            setDrawerOpen(false);
        } catch (error) {
            toast.error('Failed to send feedback');
            console.error('Error sending reply:', error);
        }
    };

    return (
        <div className='mt-5'>

            <Card>
                <CardHeader title={"User Feedbacks Table"} />
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
                            {/* <FilterButtonGroup handlefilter={handleFiletr} filter={filter} /> */}
                        </Grid>

                    </Grid>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell key={column.id}>{column.label}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {loadingForFeedback
                                    ? Array.from(new Array(7)).map((_, index) => renderSkeleton())
                                    : data?.feedbacks?.map((feedback) => (
                                        <TableRow key={feedback._id}>
                                            {columns.map((column) => (
                                                <React.Fragment key={column.id}>
                                                    {column.render(feedback)}
                                                </React.Fragment>
                                            ))}
                                        </TableRow>

                                    ))}
                            </TableBody>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}    count={data?.total || 0}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Table>
                    </TableContainer>
                    <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
                        <Box sx={{ width: 350, p: 3 }}>
                            <Typography variant="h6">User Feedback Detail</Typography>
                            {selectedFeedback && (
                                <List>
                                    <ListItem>
                                        <ListItemText primary="First Name" secondary={selectedFeedback.user.first_name} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Username" secondary={selectedFeedback.user.username} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Feedback" secondary={selectedFeedback.feedback} />
                                    </ListItem>
                                    {selectedFeedback?.reply && <ListItem>
                                        <ListItemText primary="Reply" secondary={selectedFeedback.reply} />
                                    </ListItem>}
                                </List>
                            )}
                            <TextField
                                label="Reply"
                                multiline
                                rows={4}
                                value={selectedFeedback?.reply ? selectedFeedback?.reply : reply}
                                // value={reply}
                                onChange={(e) => setReply(e.target.value)}
                                variant="outlined"
                                fullWidth
                                sx={{ mt: 2 }}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                <Button variant="contained" color="primary" onClick={() => handleSendReply(selectedFeedback?._id, reply)}>

                                   {sendingLoading?'Sending...':'Send'} 
                                </Button>
                            </Box>
                        </Box>
                    </Drawer>
                </Box>
            </Card>
            <ToastContainer/>
        </div>
    );
};

export default FeedBackPage;

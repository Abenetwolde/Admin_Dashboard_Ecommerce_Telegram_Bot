import PropTypes from 'prop-types';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { Box, Card, CardHeader, Typography, Stack, useTheme, Grid, Skeleton, Divider } from '@mui/material';
import { useGetUserTimesQuery } from '../../redux/Api/User';
import { useEffect } from 'react';
import useIntersectionObserver from '../../redux/Api/utils/useIntersectionObserver';
import Iconify from '../Iconify';

export default function TopUsersTime() {
  const navigate = useNavigate();
  const [ref, isVisible] = useIntersectionObserver();
  const { data, isLoading, error, refetch } = useGetUserTimesQuery(
    { page: 1, pageSize: 3, interval: 'perMonth', search: '' },{refetchOnMountOrArgChange: true, },
    { skip: !isVisible }
  );

  useEffect(() => {
    if (isVisible) {
      refetch();
    }
  }, [isVisible, refetch]);

  const handleViewMoreClick = () => {
    navigate('/dashboard/users');
  };

  if (isLoading) {
    return (
      <Grid item xs={12} lg={12} textAlign="center">
        <Card className="p-4">
          <Skeleton variant="text" width={200} height={40} />
          <Stack mt={1}>
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} variant="rectangular" width="100%" height={60} sx={{ mb: 2 }} />
            ))}
          </Stack>
        </Card>
      </Grid>
    );
  }

  return (
    <div  ref={ref} >

   
    <Card className="p-4">
      <CardHeader title="Top 3 Users Time Spent" />
      <Stack mt={1}>
        <Grid container justifyContent="space-between" spacing={2} sx={{ mb: 2 }}>
          <Grid item xs>
            <Typography textAlign="left" variant="body1">
              Users
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">
              Time Spent (minutes)
            </Typography>
          </Grid>
        </Grid>
        {data?.timeSpentPerScene?.map((user, i) => (
          <UserItem key={i} user={user} />
        ))}
      </Stack>
      <Divider sx={{ borderStyle: 'dashed', borderColor: 'grey.300', my: 2 }} />
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <Typography
          variant="body2"
          sx={{ color: 'text.primary', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={handleViewMoreClick}
        >
          View More <Iconify icon="weui:arrow-filled" width={20} height={20} sx={{ ml: 1 }} />
        </Typography>
      </Box>
    </Card>
    </div>
  );
}

// ----------------------------------------------------------------------



const  UserItem=({ user }) =>{
  const { user: userInfo, totalSpentTimeInMinutes } = user;
  const { first_name, username } = userInfo;
  const theme = useTheme();

  return (
    <Grid container alignItems="center" spacing={2} sx={{ mb: 2 }}>
      <Grid item xs>
        <Box display="flex" alignItems="center">
          <Box
            sx={{
              bgcolor: theme.palette.grey[200],
              width: 48,
              height: 48,
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 18,
              color: theme.palette.grey[500],
              mr: 2,
            }}
          >
            {first_name.charAt(0)}
          </Box>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {first_name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {username && `@${username}`}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {totalSpentTimeInMinutes.toFixed(2)}
        </Typography>
      </Grid>
    </Grid>
  );
}

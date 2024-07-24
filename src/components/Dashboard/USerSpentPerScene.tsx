import React, { useEffect, useState } from 'react';
import { Grid, Card,Typography, ButtonGroup, Button, Box, CardHeader, Skeleton } from '@mui/material';
import { ResponsiveContainer } from 'recharts';
import UsersSpentTimePerScene from './UsersSpentTimePerScene';
import FilterButtonGroup from '../FilterButtonGroup';
import { useGetTimePerSceneQuery } from '../../redux/Api/userKpiSlice';
import useIntersectionObserver from '../../redux/Api/utils/useIntersectionObserver';
const UserClicksSection = () => {
  const [ref, isVisible] = useIntersectionObserver();
  const [filter, setfilterClick] = useState("perMonth"); 
  const {data:filterData, isLoading, error ,refetch}:any=useGetTimePerSceneQuery(filter,{ skip: !isVisible })
  const handlefilterScene = (newFilter) => {
      setfilterClick(newFilter);
  
    };
    useEffect(() => {
      if (isVisible) {
        refetch();
      }
    }, [isVisible, refetch]);
    if (isLoading) {
      return (
        <Grid item xs={12} lg={12} textAlign="center">
          <Card className='p-3 mt-5'>
            <Box sx={{ mb: 3, textAlign: 'left' }}>
              <Skeleton variant="text" width={200} height={40} />
            </Box>
            <Box m={2}>
              <Skeleton variant="rectangular" width={300} height={50} />
            </Box>
            <Box sx={{ mt: 3, mb: 3, flex: 1, width: "100%", justifyContent: 'flex-end', alignItems: 'center' }}>
              <Skeleton variant="rectangular" width="100%" height={400} />
            </Box>
          </Card>
        </Grid>
      );
    }
    return(<Grid  ref={ref}  item xs={12} lg={12} textAlign="center">
        <Card className='p-3 mt-5'
  >
           <Box sx={{ mb: 3, textAlign: 'left' }}>
            <CardHeader sx={{ mb: 3, textAlign: 'left' }} title={" Time Per-Scene "} sx={{ mb: 3 }} />
        </Box>
  
      <Box m={2} >
        <FilterButtonGroup handlefilter={handlefilterScene} filter={filter}/>

      </Box>

      <ResponsiveContainer height={400} width="100%">
        <UsersSpentTimePerScene filter={filter} filterData={filterData} />
      </ResponsiveContainer>
      </Card>
    </Grid>

);
}
export default UserClicksSection;

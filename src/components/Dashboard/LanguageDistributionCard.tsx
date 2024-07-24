// LanguageDistributionCard.js

import { Box, Card, CardHeader, Skeleton, Typography } from '@mui/material';
import LanguagePieChart from './LanguagePieChart';
import { useGetLanguageStatsQuery } from '../../redux/Api/userKpiSlice';

const LanguageDistributionCard = () => {
  const { data: languageData, isLoading } = useGetLanguageStatsQuery();
 return( <Card  className='p-3 mt-10'>
    <Box sx={{ mb: 3, textAlign: 'left' }}>
  <CardHeader sx={{ mb: 3, textAlign: 'left' }} title={`Language Distribution`}  sx={{ mb: 3 }} />
</Box>
    {isLoading ? (
      <>
  
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 300,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Skeleton
          variant="circular"
          width={300}
          height={300}
          sx={{ position: 'absolute' }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: '50%',
            height: '50%',
            bgcolor: 'background.paper',
            borderRadius: '50%',
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop:1
        }}
      >
        {[...Array(2)].map((_, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems:'center',
              width: '100%',
               maxWidth: '100px',
               gap:1 // You can adjust the maxWidth as needed
     
            }}
          >
            <Skeleton variant="rectangular" width={20} height={20} />
            <Skeleton variant="rectangular" width={40} height={20} />
          </Box>
        ))}
      </Box>
      </>
    ) : (
      languageData ? (
        <LanguagePieChart data={languageData} />
      ) : (
        <Typography>No data available</Typography>
      )
    )}
  </Card>
);
}

export default LanguageDistributionCard;

import PropTypes from 'prop-types';
// @mui
import { Card, CardHeader, Typography, Stack, LinearProgress } from '@mui/material';
import { fPercent } from '../../utils/formatNumber';
import FilterButtonGroup from '../FilterButtonGroup';
// utils
;


export default function AllOrderStatus({OrderStatus,handleFilterOFStatusChange,filterOfStatus}:any) {
  return (
    <Card className='p-3'>
      <CardHeader title="Sales Overview" />
      <FilterButtonGroup handlefilter={handleFilterOFStatusChange} filter={filterOfStatus}/>
      <Stack spacing={4} sx={{ p: 3 }}>
        {OrderStatus.map((progress) => (
          <ProgressItem key={progress.label} progress={progress} />
        ))}
      </Stack>
    </Card>
  );
}

// ----------------------------------------------------------------------

ProgressItem.propTypes = {
  progress: PropTypes.shape({
    amount: PropTypes.number,
    label: PropTypes.string,
    value: PropTypes.number,
  }),
};

function ProgressItem({ progress }) {
  return (
    <Stack spacing={1}>
      <Stack direction="row" alignItems="center">
        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
          {progress.label}
        </Typography>
        <Typography variant="subtitle2">{progress.amount}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
               &nbsp;({fPercent(progress.value)})
        </Typography>
      </Stack>

      <LinearProgress
      valueBuffer={progress.value}
      sx={{ height: 8,
        borderRadius: 5,}}
        variant="determinate"
        value={progress.value}
        color={
          (progress.label === 'Total Delivered' && 'info') ||
          (progress.label === 'Total Pending' && 'warning') || (progress.label === 'Total Cancelled' && 'error') ||(progress.label === 'Total Complated' && 'success') ||
          'primary'
        }
      />
    </Stack>
  );
}

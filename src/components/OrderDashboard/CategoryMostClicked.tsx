import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Link, Card, CardHeader, Typography, Stack, useTheme, Grid } from '@mui/material';
import Scrollbar from '../Scrollbar';
import FilterButtonGroup from '../FilterButtonGroup';


// utils



export default function CategoryMostClicked({ data, handleFilterOFStatusChange, filterOfStatus }) {
    return (
        <Card className='p-4'>
            <CardHeader title="Latest Products" />
            <FilterButtonGroup handlefilter={handleFilterOFStatusChange} filter={filterOfStatus}/>
                     <Stack mt={1} >
                    {data?.products?.map((product) => (
                        <ProductItem key={product.id} product={product} />
                    ))}
                </Stack>
    
        </Card>
    
    );
}

// ----------------------------------------------------------------------

ProductItem.propTypes = {
    product: PropTypes.shape({
        colors: PropTypes.arrayOf(PropTypes.string),
        image: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        priceSale: PropTypes.number,
    }),
};

function ProductItem({ product }) {
    const { name, totalClickCount, icon } = product;
    const theme = useTheme();

    return (
        <Grid columnSpacing={2} pt={2} container alignItems="center">
            <Grid columnSpacing={2} item display={"flex"}  flexGrow={1}>
                <Box
                    sx={{
                        bgcolor: theme.palette.grey[200],
                        width: 48,
                        height: 48,
                        borderRadius: 1.5,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    {icon}
                </Box>
                <Typography sx={{ pl:3, color: 'text.primary', typography: 'subtitle2' }}>
                    {name}
                </Typography>
            </Grid>
         
            <Grid item >
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {totalClickCount}
                </Typography>
            </Grid>
        </Grid>
    );
}

import PropTypes from 'prop-types';
import { Box, Link, Card, CardHeader, Typography, Stack, useTheme, Grid } from '@mui/material';

import FilterButtonGroup from '../FilterButtonGroup';

export default function ProductMostClicked({ data, handleFilterOFStatusChange, filterOfStatus }) {
    return (
        <Card className='p-4'>
            <CardHeader title="Latest Products" />
            <FilterButtonGroup handlefilter={handleFilterOFStatusChange} filter={filterOfStatus} />
            <Stack mt={1} >
                {data?.products?.map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </Stack>

        </Card>

    );
}

// ----------------------------------------------------------------------


function ProductItem({ product }) {
    const { name, image, totalClickCount } = product;
    const theme = useTheme();
console.log("image",image)
    return (
        <Grid columnSpacing={2} pt={2} container alignItems="center">
            <Grid columnSpacing={2} item display={"flex"} flexGrow={1}>
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
                    <img
                        src={image}
                        alt="description"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: 'inherit'
                        }}
                    />
                </Box>
                <Typography sx={{ pl: 3, color: 'text.primary', typography: 'subtitle2' }}>
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

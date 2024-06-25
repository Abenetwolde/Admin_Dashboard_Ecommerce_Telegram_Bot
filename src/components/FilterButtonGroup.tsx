import React, { useEffect, useState } from 'react';
import { Grid, Typography, ButtonGroup, Button, Box } from '@mui/material';

const FilterButtonGroup = ({ handlefilter,filter }) => {
    const [activeButton, setActiveButton] = useState('perMonth');

    // useEffect(() => {
    //     setActiveButton(filter);
    // }, [filter]);

    const handleClick = (filter) => {
        setActiveButton(filter);
        handlefilter(filter);
    };

    const buttonStyles = (isActive) => ({
        // border: 'none',
        // '&:hover': {
        //     border: 'none',
        // },
        bgcolor: isActive ? 'primary.main' : 'inherit',
        color: isActive ? 'white' : 'inherit',
        // '&.MuiButton-outlined': {
        //     border: 'none',
        // },
        '&:focus': {
            outline: 'none',
        },
    });

    return (
    
                <Box display="flex" justifyContent={{ xs: 'center', md: 'flex-end' }}>
                    <ButtonGroup variant="outlined" aria-label="Basic button group">
                        {['perWeek', 'perMonth', 'perYear'].map((filter) => (
                            <Button
                                key={filter}
                                size='small'
                                onClick={() => handleClick(filter)}
                                sx={buttonStyles(activeButton === filter)}
                            >
                                {filter.replace('per', 'Per ')}
                            </Button>
                        ))}
                    </ButtonGroup>
                </Box>
     
    );
};

export default FilterButtonGroup;

// File: UserJoinFromCard.tsx

import React, { useEffect } from 'react';
import { Card, CardHeader, Box, Skeleton, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import merge from 'lodash/merge';
import { BaseOptionChart } from '../../components/chart';
import { useGetUserJoinedByMethodQuery } from '../../redux/Api/userKpiSlice';
import useIntersectionObserver from '../../redux/Api/utils/useIntersectionObserver';

const UserJoinFromCard = () => {
    const [ref, isVisible] = useIntersectionObserver();
    const theme = useTheme();
    const { data, isLoading, refetch } = useGetUserJoinedByMethodQuery(null, { skip: !isVisible });
    useEffect(() => {
        if (isVisible) {
            refetch();
        }
    }, [isVisible, refetch]);
    if (isLoading) {
        return (

            <Card >
                <CardHeader title="User Join From" />
                <Box display="flex" justifyContent="center" alignItems="center" p={3} width={"100%"} height={280}>
                    <Skeleton variant="circular" width={"100%"} height={"100%"} />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 1,
                        padding:3,
                    
                    }}
                >
                    {[...Array(3)].map((_, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                maxWidth: '100px',
                                gap: 1 // You can adjust the maxWidth as needed

                            }}
                        >
                            <Skeleton variant="rectangular" width={20} height={20} />
                            <Skeleton variant="rectangular" width={40} height={20} />
                        </Box>
                    ))}
                </Box>
            </Card>

        );
    }
    const CHART_HEIGHT = 372;
    const LEGEND_HEIGHT = 72;
    const ChartWrapperStyle = styled('div')(({ theme }) => ({
        height: CHART_HEIGHT,
        marginTop: theme.spacing(5),
        '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
        '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
            overflow: 'visible',
        },
        '& .apexcharts-legend': {
            height: LEGEND_HEIGHT,
            alignContent: 'center',
            position: 'relative !important',
            borderTop: `solid 1px ${theme.palette.divider}`,
            top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
        },
    }));
    const userJoiningWay = Object.entries(data?.formattedResult || {}).map(([key, value]) => {
        let name;
        switch (key) {
            case 'BOT':
                name = 'Bot';
                break;
            case 'CHANNEL':
                name = 'Channel';
                break;
            case 'INVITATION':
                name = 'Invitation';
                break;
            default:
                name = key;
        }
        return { name, value };
    });

    const labelforJoinUser = userJoiningWay.map((m) => m.name);
    const valueforJoinUser = userJoiningWay.map((m) => m.value);

    const chartOptions = merge(BaseOptionChart(), {
        colors: [
            theme.palette.primary.main,
            theme.palette.chart.blue[0],
            theme.palette.chart.violet[0],
            theme.palette.chart.yellow[0],
        ],
        labels: labelforJoinUser,
        stroke: { colors: [theme.palette.background.paper] },
        legend: { floating: true, horizontalAlign: 'center' },
        dataLabels: { enabled: true, dropShadow: { enabled: false } },
        tooltip: {
            fillSeriesColor: false,
            y: {
                formatter: (seriesName) => Number(seriesName),
                title: {
                    formatter: (seriesName) => `${seriesName}`,
                },
            },
        },
        plotOptions: {
            pie: { donut: { labels: { show: false } } },
        },
    });

    return (
        <Card ref={ref}>
            <CardHeader title="User Join From" />
      
            <ChartWrapperStyle dir="ltr" >
                <ReactApexChart type="pie" series={valueforJoinUser} options={chartOptions} height={280} />
            </ChartWrapperStyle>
        </Card> 
    );
};

export default UserJoinFromCard;

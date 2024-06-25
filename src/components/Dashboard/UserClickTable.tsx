import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import { setRowsPerPageAndFetch, setPageAndFetch } from '../../redux/userSlice';

import { MutatingDots } from 'react-loader-spinner';
import LoadingIndicator from '../LoadingIndicator';

interface UserLotteryProps {
    data: Array<any>;
    loading: boolean;
  }
  
  const UserClickTable: React.FC<UserLotteryProps> = ({ data, loading }) => {
    const sceneNames:any = Array.from(new Set(data.flatMap(item => item.userinformationperScene.map(scene => scene.sceneName))));

    const columns = [
    
        {
          accessor: 'userInformation',
          Header: 'First Name',
          Cell: ({ value }: any) => (
            <div className="flex items-center">
              {value?.first_name}
            </div>
          ),
        },
        {
            accessor: 'userInformation',
            Header: 'User Name',
            Cell: ({ value }: any) => (
              <div className="flex items-center">
                {value?.username}
              </div>
            ),
          },
          ...sceneNames.map(sceneName => ({
            accessor: sceneName,
            Header: sceneName,
            Cell: ({ value }: any) => value || 0,
        })),
        {
            accessor: 'totalClicks',
            Header: 'Total',
            Cell: ({ value }: any) => (
              <div className="flex items-center">
                {value}
              </div>
            ),
          },
      ];

    const getProductValue = (product: any, accessor: string) => {
        const keys = accessor.split('.'); // Split nested keys
        let value: any = { ...product };

        keys.forEach((key) => {
            value = value[key];
        });

        return value;
    };

    const getSceneDuration = (userinformationperScene: any[], sceneName: string) => {
        const scene = userinformationperScene.find(scene => scene.sceneName === sceneName);
        return scene ? scene.totalClicks : 0;
    };
    return (
        <>
<div>
      {
        !loading ?
          (
            <Box mt={1}>
              <TableContainer component={Paper} className="overflow-auto">
                <Table sx={{ maxWidth: 1200 }} aria-label="user table" className="border-collapse align-center justify-center mx-auto">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell key={column.accessor} className={`p-2 !text-md`}>
                          {column.Header}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

             
                  <TableBody>
                    {data?.length? data.map((product, index) => (
                      <TableRow key={product._id}>
                        {columns.map((column) => (
                            <TableCell key={column.accessor} className="p-2">
                            {column.accessor === 'userInformation' || column.accessor === 'totalClicks' ? (
                                column.Cell({ value: product[column.accessor] })
                            ) : (
                                column.Cell({ value: getSceneDuration(product.userinformationperScene, column.accessor) })
                            )}
                        </TableCell>
                        ))}
                      </TableRow>
                    )):
                    <TableRow>
                    
                    <TableCell colSpan={columns.length} className="p-2" align="center">
                No data  
                    </TableCell>
                   
                  </TableRow>
                    }
                  </TableBody>:
          </Table>
              </TableContainer>
            </Box>

          ) :

          (
            <LoadingIndicator/>
          )
      }
    </div>
        </>
    );
};

export default UserClickTable;

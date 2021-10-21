import React, { useCallback, useEffect, useState } from 'react';
import useStyles from './UserManager.styles';
import moment from 'moment';
import { getAll, updateStatus, userActions } from '../../../slices/user.slice';
import {
  Box,
  Container,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
function UserManager() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const totalResults = useSelector((state) => state.user.totalResults);
  const results = useSelector((state) => state.user.results);
  const totalPages = useSelector((state) => state.user.totalPages);
  const getUserHandler = useCallback(
    async (page, limit) => {
      try {
        await dispatch(
          getAll({
            page,
            limit,
          })
        ).unwrap();
      } catch (error) {
        toast.error(error);
        console.log('🚀 ~ file: UserManager.jsx ~ line 274 ~ getUserHandler ~ error', error);
      }
    },
    [dispatch]
  );
  const rowsPerPageChangeHandler = (event) => {
    const newLimit = +event.target.value;
    setRowsPerPage(newLimit);
    setPage(0);
  };
  const pageChangeHandler = (event, value) => {
    setPage(value);
  };
  const statusChangeHandler = async (e, id) => {
    console.log(e.target.value);

    e.stopPropagation();
    const newStatus = e.target.value === 'false' ? false : true;
    try {
      await dispatch(
        updateStatus({
          id,
          banned: newStatus,
        })
      ).unwrap();

      dispatch(
        userActions.updateStatus({
          id,
          banned: newStatus,
        })
      );
      // toast.success(`Update [ROLE] for id: [${accId}] > ${newRole}`);
      toast.success('Update status successfully');
    } catch (error) {
      // toast.error(`Update [ROLE] for id: [${accId}] failed`);
      toast.error(error);
    }
  };
  useEffect(() => {
    getUserHandler(page + 1, rowsPerPage);
  }, [getUserHandler, page, rowsPerPage]);

  return (
    <div className={classes.root}>
      <Container>
        <Box margin="20px 30px">
          <Typography variant="h3" align="center">
            User Manager
          </Typography>
        </Box>
        <Box boxShadow={6}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className={classes.tableHead}>
                  <TableCell style={{ fontWeight: 'bold' }}>ID</TableCell>
                  <TableCell> Username </TableCell>
                  <TableCell> Last Active At </TableCell>
                  <TableCell> Created At </TableCell>
                  <TableCell> Status </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((row, index) => (
                  <TableRow
                    key={index}
                    // onClick={() => openUpdateModalHandler(row.prod_id)}
                    className={classes.tableRow}>
                    <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>
                      {row._id}
                    </TableCell>
                    <TableCell>{row.username}</TableCell>
                    <TableCell>{moment(row.lastActiveAt).format('MM/DD/yyyy')}</TableCell>
                    <TableCell>{moment(row.createdAt).format('MM/DD/yyyy')}</TableCell>
                    <TableCell>
                      <Box width={100}>
                        <Select
                          native
                          value={row.banned}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => statusChangeHandler(e, row._id)}>
                          <option value={false}>Active</option>
                          <option value={true}>Blocked</option>
                        </Select>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    count={totalResults}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={pageChangeHandler}
                    onRowsPerPageChange={rowsPerPageChangeHandler}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </div>
  );
}

export default UserManager;

import React, { useCallback, useEffect, useState } from 'react';
import useStyles from './ProducerManager.styles';
import {
  Box,
  Button,
  Container,
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
import ModalConfirm from '../../../components/ModalConfirm/ModalConfirm';
import { Add, Delete, Edit } from '@material-ui/icons';
import AddOrUpdateModal from './AddOrUpdateModal';
import { producerDelete, producerGetAll } from '../../../slices/producer.slice';

function ProducerManager() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const totalResults = useSelector((state) => state.producer.totalResults);
  const results = useSelector((state) => state.producer.results);
  // const totalPages = useSelector((state) => state.producer.totalPages);
  const [modalState, setModalState] = useState({
    addOrUpdate: false,
    delete: false,
    type: null,
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const getProducerHandler = useCallback(
    async (page, limit) => {
      try {
        await dispatch(
          producerGetAll({
            page,
            limit,
          })
        ).unwrap();
      } catch (error) {
        toast.error(error);
        console.log(
          '🚀 ~ file: ProducerManager.jsx ~ line 274 ~ getProducerHandler ~ error',
          error
        );
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

  const openDeleteModalHandler = (e, id) => {
    e.stopPropagation();
    setSelectedItem(id);
    setModalState({
      addOrUpdate: false,
      delete: true,
      type: null,
    });
  };

  const openUpdateModalHandler = (e, item) => {
    e.stopPropagation();
    setSelectedItem(item);
    setModalState({
      addOrUpdate: true,
      delete: false,
      type: 'UPDATE',
    });
  };
  const openAddModalHandler = (e, item) => {
    e.stopPropagation();
    setSelectedItem(item);
    setModalState({
      addOrUpdate: true,
      delete: false,
      type: 'ADD',
    });
  };

  const closeModalHandler = () => {
    setModalState({
      addOrUpdate: false,
      delete: false,
      type: null,
    });
    setSelectedItem(null);
  };

  const deleteProducerHandler = async () => {
    try {
      await dispatch(
        producerDelete({
          id: selectedItem._id,
        })
      ).unwrap();
      toast.success('DELETE Successfully');
      closeModalHandler();
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    getProducerHandler(page + 1, rowsPerPage);
  }, [getProducerHandler, page, rowsPerPage]);

  return (
    <div className={classes.root}>
      <AddOrUpdateModal
        title={modalState.type === 'UPDATE' ? 'Update Producer' : 'Add Producer'}
        buttonLabel={modalState.type === 'UPDATE' ? 'Update' : 'Add'}
        type={modalState.type}
        isOpen={modalState.addOrUpdate}
        selectedItem={selectedItem}
        onClose={closeModalHandler}
      />
      <ModalConfirm
        isOpen={modalState.delete}
        onClose={closeModalHandler}
        onConfirm={deleteProducerHandler}
      />
      <Container>
        <Box margin="20px 30px">
          <Typography variant="h3" align="center">
            Producer Manager
          </Typography>
        </Box>
        <Box textAlign="right" marginBottom={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={openAddModalHandler}>
            Add New
          </Button>
        </Box>
        <Box boxShadow={6}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className={classes.tableHead}>
                  <TableCell style={{ fontWeight: 'bold' }}>ID</TableCell>
                  <TableCell> Name </TableCell>
                  <TableCell> Country </TableCell>
                  <TableCell> Options </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results?.map((row, index) => (
                  <TableRow
                    key={index}
                    // onClick={() => openUpdateModalHandler(row.prod_id)}
                    className={classes.tableRow}>
                    <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>
                      {row._id}
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell style={{ textTransform: 'upperCase' }}>{row.country}</TableCell>
                    <TableCell>
                      <Box display="flex">
                        <Edit
                          className={classes.actionIcon}
                          onClick={(e) => openUpdateModalHandler(e, row)}
                        />
                        <Delete
                          className={classes.actionIcon}
                          onClick={(e) => openDeleteModalHandler(e, row)}
                        />
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

export default ProducerManager;

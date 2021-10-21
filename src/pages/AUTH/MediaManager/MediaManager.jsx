import React, { useCallback, useEffect, useState } from 'react';
import useStyles from './MediaManger.styles';
import { genreDelete, genreGetAll } from '../../../slices/genre.slice';
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
import { mediaGetAll } from '../../../slices/media.slice';
import moment from 'moment';
function MediaManager() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const totalResults = useSelector((state) => state.media.totalResults);
  const results = useSelector((state) => state.media.results);
  // const totalPages = useSelector((state) => state.media.totalPages);
  const [modalState, setModalState] = useState({
    addOrUpdate: false,
    delete: false,
    type: null,
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const getMediaHandler = useCallback(
    async (page, limit) => {
      try {
        await dispatch(
          mediaGetAll({
            page,
            limit,
          })
        ).unwrap();
      } catch (error) {
        toast.error(error);
        console.log('🚀 ~ file: MediaManager.jsx ~ line 274 ~ getMediaHandler ~ error', error);
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

  const deleteGenreHandler = async () => {
    try {
      await dispatch(
        genreDelete({
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
    getMediaHandler(page + 1, rowsPerPage);
  }, [getMediaHandler, page, rowsPerPage]);

  return (
    <div className={classes.root}>
      <ModalConfirm
        isOpen={modalState.delete}
        onClose={closeModalHandler}
        onConfirm={deleteGenreHandler}
      />
      <Container>
        <Box margin="20px 30px">
          <Typography variant="h3" align="center">
            Media Manager
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
                  <TableCell> Title </TableCell>
                  <TableCell> Type </TableCell>
                  <TableCell> Overview </TableCell>
                  <TableCell> Genres</TableCell>
                  <TableCell> Views </TableCell>
                  <TableCell> Likes </TableCell>
                  <TableCell> Dislikes </TableCell>
                  <TableCell> Release Date </TableCell>
                  <TableCell> Created At </TableCell>
                  <TableCell> Update At </TableCell>
                  <TableCell> Options </TableCell>
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
                    <TableCell>{row.title} </TableCell>
                    <TableCell> {row.type} </TableCell>
                    <TableCell>
                      <Box className={classes.longText}>{row.overview}</Box>{' '}
                    </TableCell>
                    <TableCell> {row.genres?.map((item) => item.name)?.join(', ')} </TableCell>
                    <TableCell> {row.views} </TableCell>
                    <TableCell> {row.likes} </TableCell>
                    <TableCell> {row.dislikes} </TableCell>
                    <TableCell> {moment(row.releaseDate).format('MM/DD/yyyy')} </TableCell>
                    <TableCell> {moment(row.createdAt).format('MM/DD/yyyy')} </TableCell>
                    <TableCell> {moment(row.updateAt).format('MM/DD/yyyy')} </TableCell>
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

export default MediaManager;

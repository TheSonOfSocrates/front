import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
// @mui
import {
  Avatar, Box,
  Card,
  Checkbox,
  Container, DialogActions, DialogContent, DialogTitle, Fade,
  IconButton,
  MenuItem,
  Paper,
  Popover, Popper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow, TextField,
  Typography,
  Grid, CardHeader, CardContent,
} from '@mui/material';
// components
import Label from '../../components/label';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
// hooks
import { useDispatch, useSelector } from 'react-redux';
// sections
import { UserListHead, UserListToolbar } from '../../sections/admin/user';
// mock
import { getAllUsers, sendEmail } from '../../redux/slices/user';
// utils
import { getFormattedDateTime } from '../../utils/freqUtils';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { deleteNotifications } from '../../redux/slices/notification';
import { expireLicenseKey } from '../../api/profile';
import Modal from '@mui/material/Modal';
import { DatePicker } from '@mui/x-date-pickers';
import Autocomplete from '@mui/material/Autocomplete';
import Logo from '../../components/logo';
import { giveLicenseKey } from '../../api/admin';
import { useSnackbar } from 'notistack';
import { updateUserInfo } from 'redux/slices/user';
import { monthsToYearsAndMonths } from '../../utils/freqUtils';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'paymentStatus', label: ' Payment Status', alignRight: false },
  { id: 'planName', label: 'Plan Name', alignRight: false },
  { id: 'period', label: 'Period', alignRight: false },
  { id: 'licenseExpireAt', label: 'License Expire At', alignRight: false },
  { id: '' },
];

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #15b3b2',
  borderRadius: 3,
  boxShadow: 24,
  p: 2,
};

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserMngPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [email, setEmail] = useState('');

  const [expirationDate, setExpiretionDate] = useState(new Date());

  const [givingLicenseDlgOpen, setGivingLicenseDlgOpen] = useState(false);

  const { users } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const handleGiveClick = () => {
    console.log(email);
    setGivingLicenseDlgOpen(true);
  };

  const closeGivingLicenseDlg = () => {
    setGivingLicenseDlgOpen(false);
  };

  const giveLicense = async () => {
    if (new Date().getTime() > new Date(expirationDate).getTime()) {
      return enqueueSnackbar('Invalid expiration date', { variant: 'error' });
    }

    setGivingLicenseDlgOpen(false);
    const result = await giveLicenseKey({ expirationDate, email });
    handleCloseMenu();
    if (result.status === 200 && result.data.success) {
      enqueueSnackbar('You gave license key successfully.', { variant: 'success' });

      await dispatch(updateUserInfo(email, result.data.licenseExpireAt, result.data.licensePeriod, result.data.paymentStatus));
    } else {
      if (result.status === 200)
        enqueueSnackbar(result.data.msg, { variant: 'error' });
      else
        enqueueSnackbar('Giving license key failed.', { variant: 'error' });
    }
  };

  const handleOpenMenu = (event, email) => {
    setEmail(email);
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.email);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleExpiretionDateChanged = (e) => {
    setExpiretionDate(e);
  };

  const handleClick = (event, email) => {
    const selectedIndex = selected.indexOf(email);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, email);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const filteredUsers = applySortFilter(users, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Container>
        <Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
          <Typography variant='h4' gutterBottom>
            User
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar selectedUsers={selected} numSelected={selected.length} filterName={filterName}
                           onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={users.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    let {
                      id,
                      name,
                      email,
                      role,
                      paymentStatus,
                      planId,
                      isVerified,
                      licenseExpireAt,
                      licensePeriod,
                    } = row;

                    if (paymentStatus !== 'Purchased') {
                      planId = undefined;
                      licenseExpireAt = undefined;
                      licensePeriod = undefined;
                    }

                    const selectedUser = selected.indexOf(email) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role='checkbox' selected={selectedUser}>
                        <TableCell padding='checkbox'>
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, email)} />
                        </TableCell>
                        <TableCell component='th' scope='row' padding='none'>
                          <Stack direction='row' alignItems='center' spacing={2}>
                            <Typography variant='subtitle2' noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align='left'>{email}</TableCell>
                        <TableCell align='left'>{role}</TableCell>
                        <TableCell align='left'>{isVerified ? 'Yes' : 'No'}</TableCell>
                        <TableCell align='left'>
                          <Label
                            color={(paymentStatus === 'Not' && 'error') || 'success'}>{sentenceCase(paymentStatus)}</Label>
                        </TableCell>
                        <TableCell
                          align='left'>{planId === null || planId === undefined ? '' : planId?.name}</TableCell>
                        <TableCell
                          align='left'>{planId === null || planId === undefined ? '' : monthsToYearsAndMonths(licensePeriod)}</TableCell>
                        <TableCell align='left'>{getFormattedDateTime(new Date(licenseExpireAt))}</TableCell>
                        <TableCell align='right'>
                          <IconButton size='large' color='inherit' onClick={(e) => handleOpenMenu(e, email)}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align='center' colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant='h6' paragraph>
                            Not found
                          </Typography>

                          <Typography variant='body2'>
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 200,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >

        <MenuItem onClick={handleGiveClick}>
          <Iconify icon={'eva:rewind-right-outline'} sx={{ mr: 2 }} />
          Give License
        </MenuItem>
      </Popover>

      <Modal
        open={givingLicenseDlgOpen}
        onClose={closeGivingLicenseDlg}>
        <Box sx={modalStyle}>
          <DialogTitle>Input expiration date of new license.</DialogTitle>
          <DialogContent>
            <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
              <DatePicker
                label='Birthday'
                value={expirationDate}
                onChange={setExpiretionDate}
                views={['month', 'year']}
                renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
              />
            </Box>
          </DialogContent>
          <DialogActions style={{ justifyContent: 'center' }}>
            <Button variant='contained' onClick={closeGivingLicenseDlg}>Cancel</Button>
            <Button variant='contained' onClick={giveLicense}>
              Ok
            </Button>
          </DialogActions>
        </Box>
      </Modal>
    </>
  );
}

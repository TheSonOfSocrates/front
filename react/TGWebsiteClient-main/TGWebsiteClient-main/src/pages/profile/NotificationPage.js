import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
// @mui
import {
  Avatar, Button,
  Card,
  Checkbox,
  Container,
  IconButton,
  MenuItem,
  Paper,
  Popover,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
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
import { getAllUsers } from '../../redux/slices/user';
// utils
import { getFormattedDateTime } from '../../utils/freqUtils';
// ----------------------------------------------------------------------
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import NotificationTable from '../../sections/profile/Notification/NotificationTable';

export default function NotificationPage() {

  return (
    <>
      <Helmet>
        <title> Profile | Notifications </title>
      </Helmet>
      <NotificationTable />
    </>
  );
}

import { Avatar, Checkbox, IconButton, Stack, TableCell, TableRow, Typography } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { getFormattedDateTime } from '../../../utils/freqUtils';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import { useState } from 'react';
import Label from '../../../components/label';
import Tooltip from '@mui/material/Tooltip';
import { viewNotification } from '../../../redux/slices/notification';
import { useSelector, useDispatch } from 'react-redux';

export default function NotificationTableRow(props) {

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const {
    index,
    _id,
    content,
    status,
    date,
    sender,
  } = props.row;
  const handleOpen = () => {
    setOpen(!open);
    if (props.row.status === 'New') {
      dispatch(viewNotification(props.row._id));
    }
  };

  const styles = {
    notification: {
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      WebkitLineClamp: 1,
    },
  };

  return (
    <>
      <TableRow hover key={index} tabIndex={-1} role='checkbox' selected={props.selectedNotification}>

        <TableCell padding='checkbox'>
          <Checkbox checked={props.selectedNotification} onChange={(event) => props?.handleClick(event, _id)} />
        </TableCell>

        <TableCell align='left'>
          <Typography variant='span' sx={styles.notification}>
            <IconButton
              aria-label='expand row'
              size='small'
              onClick={handleOpen}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>{content}
          </Typography>
        </TableCell>
        <TableCell align='right' style={{ width: 100 }}>
          <Label
            color={status === 'New' ? 'error' : 'success'}>{status}</Label>
        </TableCell>
        <TableCell align='right' style={{ width: 200 }}>{getFormattedDateTime(new Date(date))}</TableCell>

        <TableCell align='right' padding='normal' style={{ width: 100 }}>
          <Stack direction='row' alignItems='center' spacing={2} justifyContent={'end'}>
            <Tooltip title={sender?.name} arrow>
              <Avatar sx={{ bgcolor: 'background.neutral' }}>
                <img src={'/uploads/avatar/' + sender.avatar} />
              </Avatar>
            </Tooltip>
          </Stack>
        </TableCell>

      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant='h6' gutterBottom component='div'>
                {content}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
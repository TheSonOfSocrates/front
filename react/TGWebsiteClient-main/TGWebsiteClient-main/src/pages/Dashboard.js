import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import { Divider, Typography, Stack, Button } from '@mui/material';
import { getAllUsers, deleteUser } from 'redux/slices/user';
// sections

// ----------------------------------------------------------------------

export default function ServicePage() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  return (
    <>
      <Helmet>
        <title> Service | TG</title>
      </Helmet>
      <Stack>
        {users.map((user, index) => (
          <Stack key={index} direction="row" spacing={10}>
            <Typography>{user.name}</Typography>

            <Typography>{user.email}</Typography>
            <Button
              variant="contained"
              color="error"
              onClick={() => dispatch(deleteUser(user.email))}
            >
              Delete
            </Button>
          </Stack>
        ))}
      </Stack>
    </>
  );
}

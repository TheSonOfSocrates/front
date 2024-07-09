import { Helmet } from 'react-helmet-async';
import AccountInfo from '../../sections/profile/AccountInfo';
import PasswordChange from '../../sections/profile/PasswordChange';
import { Grid } from '@mui/material';
// ----------------------------------------------------------------------

export default function AccountPage() {

  return (
    <>
      <Helmet>
        <title> Profile | Account </title>
      </Helmet>

      <Grid container spacing={3} sx={{ padding: 2 }}>
        <Grid item xs={12} sm={6} md={8}>
          <AccountInfo />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <PasswordChange />
        </Grid>
      </Grid>
    </>
  );
}
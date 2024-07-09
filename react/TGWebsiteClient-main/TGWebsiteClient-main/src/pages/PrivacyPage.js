import { Helmet } from 'react-helmet-async';
// @mui
import { Divider } from '@mui/material';
// sections
import Privacy from '../sections/privacy/Privacy';

// ----------------------------------------------------------------------

export default function PrivacyPage() {
  return (
    <>
      <Helmet>
        <title> Privacy | TG</title>
      </Helmet>
      <Privacy />
    </>
  );
}

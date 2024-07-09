import { Helmet } from 'react-helmet-async';
// @mui
import { Divider } from '@mui/material';
// sections
import Service from '../sections/service/Service';

// ----------------------------------------------------------------------

export default function ServicePage() {
  return (
    <>
      <Helmet>
        <title> Service | TG</title>
      </Helmet>
      <Service />
    </>
  );
}

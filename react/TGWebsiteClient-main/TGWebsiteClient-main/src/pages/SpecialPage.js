import { Helmet } from 'react-helmet-async';
// @mui
import { Divider } from '@mui/material';
// sections
import Special from '../sections/special/Special';

// ----------------------------------------------------------------------

export default function SpecialPage() {
  return (
    <>
      <Helmet>
        <title> Special | TG</title>
      </Helmet>
      <Special />
    </>
  );
}

import { Helmet } from 'react-helmet-async';
// @mui
import { Box, Container, Typography } from '@mui/material';
// sections
import { FaqsHero, FaqsCategory, FaqsList, FaqsForm } from '../sections/faqs';

// ----------------------------------------------------------------------

export default function FaqsPage() {
  return (
    <>
      <Helmet>
        <title> Faqs | TG</title>
      </Helmet>

      <Container sx={{ pt: 15, pb: 10, position: 'relative' }}>
        <Typography variant="h3" sx={{ mb: 5 }}>
          Frequently asked questions
        </Typography>

        <FaqsList />
      </Container>
    </>
  );
}

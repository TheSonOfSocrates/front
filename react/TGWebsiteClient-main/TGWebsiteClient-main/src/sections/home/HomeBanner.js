import { m } from 'framer-motion';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Container, Typography, Stack, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
// components
import Image from '../../components/image';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------
const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(10, 0),
  // [theme.breakpoints.up('md')]: {
  //   padding: theme.spacing(15, 0),
  // },
}));

// ----------------------------------------------------------------------

export default function HomeMinimal() {
  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={3}
          sx={{
            bgcolor: '#2240a1',
            px: 5,
            py: 5,
            borderRadius: 1,
          }}
        >
          <Stack flex={1}>
            <Typography variant="h3" color="white">
              Step Up Your Game with the Bot That Stands Apart from the Rest
            </Typography>
            <Typography color="white">
              "10 Unbeatable Facts About Our Trading Bot that You Need to Know"
            </Typography>
          </Stack>
          <Button
            variant="contained"
            size="large"
            color="inherit"
            component={RouterLink}
            to="/special"
          >
            Read More
          </Button>
        </Stack>
      </Container>
    </StyledRoot>
  );
}

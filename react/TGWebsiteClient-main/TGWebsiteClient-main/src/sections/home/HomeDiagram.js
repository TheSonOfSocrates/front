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
        <Stack alignItems="center" spacing={3}>
          <m.div variants={varFade().inUp}>
            <Image
              alt="our office 1"
              src="/assets/images/special/1.png"
              sx={{
                width: { lg: 800, xs: 1 },
                borderRadius: 2,
              }}
            />
          </m.div>
          <m.div variants={varFade().inUp}>
            <Image
              alt="our office 1"
              src="/assets/images/special/2.png"
              sx={{
                width: { lg: 800, xs: 1 },
                borderRadius: 2,
              }}
            />
          </m.div>
        </Stack>
      </Container>
    </StyledRoot>
  );
}

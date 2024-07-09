import { m } from 'framer-motion';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Container, Typography, Stack, Button } from '@mui/material';
// components
import Image from '../../components/image';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------
const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  // background: 'url(/assets/images/bg_effect.png)',
  // backgroundRepeat: 'no-repeat',
  // backgroundPosition: 'right top',
}));

// ----------------------------------------------------------------------

export default function HomeMinimal() {
  return (
    <StyledRoot>
      <Container component={MotionViewport} maxWidth="md">
        <Stack
          spacing={3}
          sx={{
            textAlign: 'center',
            // mb: { xs: 5, md: 10 },
          }}
        >
          <m.div variants={varFade().inDown}>
            <Typography variant="h3">
              "Dedicated and committed to delivering the highest standards of service and
              performance in everything we do, turn impossible tasks into reality"
            </Typography>
          </m.div>
          {/* <m.div variants={varFade().inDown}>
            <Button
              sx={{
                width: 200,
                height: 60,
                color: 'white',
                borderRadius: 5,
                background: 'linear-gradient(to right, #B985F4, #7635dc)',
              }}
            >
              Demo Button Here
            </Button>
          </m.div> */}
          {/* <m.div variants={varFade().inDown}>
            <Box
              component="img"
              src="/assets/images/chart.png"
              sx={{ width: 1, boxShadow: '0 0 20px 5px #7635dc', mt: 5, borderRadius: 3 }}
            />
          </m.div> */}
        </Stack>
      </Container>
    </StyledRoot>
  );
}

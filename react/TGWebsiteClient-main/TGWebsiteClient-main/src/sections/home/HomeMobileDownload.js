import { m } from 'framer-motion';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Container, Typography, Stack, Button, Grid } from '@mui/material';
// components
import Image from '../../components/image';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------
const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  // [theme.breakpoints.up('md')]: {
  //   padding: theme.spacing(15, 0),
  // },
}));

// ----------------------------------------------------------------------

export default function HomeMobileDownload() {
  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <Grid container spacing={10}>
          <Grid item md={6}>
            <Box
              flex={1}
              component="img"
              src="/assets/images/mobile_app/download-section.webp"
              sx={{ width: 1 }}
            />
          </Grid>
          <Grid item md={6}>
            <Stack spacing={5}>
              <Stack>
                <Typography variant="h3">Trade on the go. Anywhere, anytime.</Typography>
                <Typography>
                  Download the mobile application, track strategy statistics, launch bots, and close
                  orders. Whether you’re at home or on the road, manage your positions anywhere.
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={3}>
                <Box
                  component="img"
                  src="/assets/images/mobile_app/download-appstore.png"
                  sx={{
                    width: 160,
                    height: 52,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    '&:hover': { opacity: 0.7 },
                  }}
                />
                <Box
                  component="img"
                  src="/assets/images/mobile_app/download-googleplay.png"
                  sx={{
                    width: 160,
                    height: 52,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    '&:hover': { opacity: 0.7 },
                  }}
                />
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </StyledRoot>
  );
}

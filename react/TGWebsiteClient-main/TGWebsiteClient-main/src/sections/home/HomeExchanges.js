import { m } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Container, Typography, Stack, Button, Grid } from '@mui/material';
// components
import Image from '../../components/image';
import { MotionViewport, varFade } from '../../components/animate';
import { PATH_AUTH } from 'routes/paths';
// ----------------------------------------------------------------------
const CONTENTS = [
  {
    title: 'BYBIT',
    id: 'bybit',
    link: '/',
  },
  {
    title: 'OKX',
    id: 'okx',
    link: '/',
  },
  {
    title: 'KUCOIN',
    id: 'kucoin',
    link: '/',
  },
  {
    title: 'Coinbase',
    id: 'coinbase',
    link: '/',
  },
];
// ----------------------------------------------------------------------
const StyledRoot = styled('div')(({ theme }) => ({
  // background: '#0B0E11',
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
        <Stack mb={5}>
          <Typography variant="h2">Choose from your favorite Centralized Exchanges</Typography>
          <Typography>
            Our trading bot is designed to work seamlessly with the most popular ones on the market.
          </Typography>
        </Stack>
        <Grid container spacing={3} alignItems="stretch">
          <Grid item md={3} sm={12}>
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{
                bgcolor: '#ffffff',
                height: 1,
                borderRadius: 0.5,
                cursor: 'pointer',
                transition: 'all 0.3s',
                border: '5px solid transparent',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  border: '5px solid #E5C233',
                },
              }}
            >
              <Box component="img" src="/assets/images/exchanges/binance.svg" />
            </Stack>
          </Grid>
          <Grid container item spacing={3} md={6} xs={12}>
            {CONTENTS.map((item, index) => (
              <Grid item md={6} key={index}>
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    position: 'relative',
                    bgcolor: '#ffffff',
                    height: 80,
                    borderRadius: 0.5,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    border: '5px solid transparent',
                    '&::after': {
                      content: '"Comming soon..."',
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 1,
                      height: 1,
                      opacity: 0,
                      bgcolor: '#00000095',
                      transition: 'all 0.3s',
                    },
                    '&:hover': {
                      border: '5px solid #E5C233',
                      transform: 'translateY(-10px)',
                      '&::after': { opacity: 1 },
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={`/assets/images/exchanges/${item.id}.svg`}
                    sx={{ width: 160 }}
                  />
                </Stack>
              </Grid>
            ))}
          </Grid>
          <Grid item md={3}>
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{
                bgcolor: '#ffffff',
                height: 1,
                borderRadius: 0.5,
                cursor: 'pointer',
                transition: 'all 0.3s',
                border: '5px solid transparent',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  border: '5px solid #E5C233',
                },
              }}
            >
              <Box component="img" src="/assets/images/exchanges/etoro.png" />
            </Stack>
          </Grid>
        </Grid>
        <Stack alignItems="center" mt={5}>
          <Button
            variant="contained"
            sx={{ mx: 'auto' }}
            size="large"
            component={RouterLink}
            to={PATH_AUTH.register}
          >
            Sign Up For Free
          </Button>
        </Stack>
      </Container>
    </StyledRoot>
  );
}

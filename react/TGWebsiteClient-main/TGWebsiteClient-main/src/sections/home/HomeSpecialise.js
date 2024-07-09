import { m } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Container, Typography, Stack, Button, Grid } from '@mui/material';
// components
import Image from '../../components/image';
import { MotionViewport, varFade } from '../../components/animate';
import Iconify from 'components/iconify';
import { PATH_AUTH } from 'routes/paths';
import { useSettingsContext } from 'components/settings//SettingsContext';
// ----------------------------------------------------------------------
const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  // [theme.breakpoints.up('md')]: {
  //   padding: theme.spacing(15, 0),
  // },
}));

const Cards = [
  {
    icon: 'eva:swap-fill',
    title: 'Trading Consulting',
    text: 'We create for you and support custom trading strategies.',
  },
  {
    icon: 'eva:bar-chart-fill',
    title: 'Trading Bot Subscription',
    text: 'Monthly subscription for our in-house trading bot.',
  },
  {
    icon: 'mdi:shield-check-outline',
    title: 'Custom Trading Bots',
    text: 'We can create custom trading bots to suit your specific needs.',
  },
  // {
  //   icon: 'bx:bot',
  //   title: 'Heading 04',
  //   text: 'Lorem ipsum dolor sit amet, consecteur adipsicing elit.',
  // },
  // {
  //   icon: 'ri:money-dollar-circle-fill',
  //   title: 'Heading 05',
  //   text: 'Lorem ipsum dolor sit amet, consecteur adipsicing elit.',
  // },
  // {
  //   icon: 'uil:bitcoin',
  //   title: 'Heading 06',
  //   text: 'Lorem ipsum dolor sit amet, consecteur adipsicing elit.',
  // },
];

// ----------------------------------------------------------------------

export default function HomeSpecialise() {
  const { themeMode, onToggleMode } = useSettingsContext();
  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <Stack spacing={3}>
          <Stack alignItems="center">
            <Typography flex={1} variant="h2">
              We specialize in:
            </Typography>
          </Stack>
          <m.div variants={varFade().inDown}>
            <Stack mt={5}>
              <Grid container spacing={3}>
                {Cards.map((item, index) => (
                  <Grid item md={4} key={index}>
                    <Stack
                      sx={{
                        bgcolor: themeMode == 'light' ? '#ffffff' : '#0B0E11',
                        border: `1px solid ${themeMode == 'light' ? '#C4CDD5' : 'transparent'}`,
                        borderRadius: 3,
                        p: 3,
                        pb: 5,
                      }}
                      spacing={3}
                    >
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        sx={{ bgcolor: 'primary.main', borderRadius: 1, width: 60, height: 60 }}
                      >
                        <Iconify icon={item.icon} width={40} />
                      </Stack>
                      <Typography variant="h4">{item.title}</Typography>
                      <Typography color="text.secondary">{item.text}</Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </m.div>

          <m.div variants={varFade().inDown}>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={5} mt={5}>
              <Button
                component={RouterLink}
                sx={{
                  borderRadius: 5,
                  bgcolor: 'primary.main',
                  width: 200,
                  height: 54,
                  color: 'white',
                  border: '2px solid transparent',
                  '&:hover': { borderColor: 'primary.main' },
                }}
                to={PATH_AUTH.register}
              >
                Sign Up
              </Button>
              <Button
                component={RouterLink}
                to={PATH_AUTH.register}
                sx={{
                  borderRadius: 5,
                  bgcolor: 'primary.main',
                  width: 200,
                  height: 54,
                  color: 'white',
                  border: '2px solid transparent',
                  '&:hover': { borderColor: 'primary.main' },
                }}
              >
                Subscribe
              </Button>
            </Stack>
          </m.div>
        </Stack>
      </Container>
    </StyledRoot>
  );
}

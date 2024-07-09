import { m } from 'framer-motion';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Container, Typography, Stack, Button, Grid } from '@mui/material';
// components
import Image from '../../components/image';
import { MotionViewport, varFade } from '../../components/animate';
import Iconify from 'components/iconify';
import { Contents } from 'assets/data/contents';

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

export default function HomeMinimal() {
  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <Stack
          spacing={3}
          sx={{
            mb: 5,
          }}
        >
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            alignItems={{ xs: 'flex-start', md: 'center' }}
          >
            <Typography
              flex={1}
              variant="h3"
              sx={{
                mb: { xs: 3 },
              }}
            >
              {Contents.homeSection2.left}
            </Typography>
            <Stack flex={1} spacing={2} sx={{ pl: { xs: 0, md: 10 } }}>
              <Typography>
                - We can offer guidance on any aspect of trading from asset choice to strategy.
              </Typography>
              <Typography>- We provide training and build strategies</Typography>
              <Typography>
                - We work closely with every client, identifying their expectations, defining risk
                profiles and more.
              </Typography>
              <Typography>
                - We respect your risk profile, allowing you to implement any strategy easily and
                effectively.
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </StyledRoot>
  );
}

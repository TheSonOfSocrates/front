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
    title: 'Step & Step Interval',
    text: 'Our bot offers step and interval step options, allowing for unrestricted trading.',
  },
  {
    title: 'Self Custody Private VPS',
    text: 'Personal VPS that offers a self-custody private and secure hosting environment.',
  },
  {
    title: 'Dashboard',
    text: 'With our custom dashboard, you can keep an eye on and manage all of your trades with ease.',
  },
  {
    title: 'Trading integration',
    text: 'Receive live streaming data, including a trading graph, and place orders directly into your account.',
  },
  {
    title: 'Automated Trade',
    text: 'Achieve optimal trade performance by utilizing our automated trading bots with successful strategies.',
  },
  {
    title: 'Strategy',
    text: 'The bot can accommodate to any adjustments towards a trader’s strategy and needs.',
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
          <Typography variant="h2">TG Awesome Features</Typography>
        </Stack>
        <Grid container spacing={5}>
          {CONTENTS.map((item, index) => (
            <Grid item md={4} sm={12} key={index}>
              <Stack spacing={2}>
                <Stack alignItems="center" spacing={2}>
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{ width: 100, height: 100, bgcolor: 'white', borderRadius: '50%' }}
                  >
                    <Box
                      component="img"
                      src={`/assets/icons/features/${index + 1}.png`}
                      sx={{ width: 60 }}
                    />
                  </Stack>
                  <Typography variant="h4">{item.title}</Typography>
                </Stack>
                <Typography>{item.text}</Typography>
              </Stack>
            </Grid>
          ))}
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

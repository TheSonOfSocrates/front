import { m } from 'framer-motion';
// @mui
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Button, Box, Container, Stack, Typography } from '@mui/material';
// utils
import { bgGradient } from '../../utils/cssStyles';
// routes
import { PATH_FREE_VERSION, PATH_MINIMAL_ON_STORE } from '../../routes/paths';
// components
import Iconify from '../../components/iconify';
import Image from '../../components/image';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

export default function HomeAdvertisement() {
  const theme = useTheme();

  return (
    <Container component={MotionViewport} sx={{ pb: 10 }}>
      <Stack
        alignItems="center"
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          // ...bgGradient({
          //   direction: '135deg',
          //   startColor: theme.palette.primary.main,
          //   endColor: theme.palette.primary.dark,
          // }),
          background: 'black',
          borderRadius: 2,
          pb: { xs: 5, md: 0 },
        }}
      >
        <Content />
        <Description />
      </Stack>
    </Container>
  );
}

// ----------------------------------------------------------------------

function Description() {
  return (
    <Box
      sx={{
        textAlign: {
          xs: 'center',
          md: 'left',
        },
      }}
    >
      <Box
        component={m.div}
        variants={varFade().inDown}
        sx={{ color: 'common.white', mb: 5, typography: 'h2' }}
      >
        Get started with <br />
        TG Trading Bot fully <br /> implemented on{' '}
        <Typography component="span" variant="h2" color="warning.main">
          {' '}
          Binance
        </Typography>{' '}
        today
      </Box>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent={{ xs: 'center', md: 'flex-start' }}
        spacing={2}
      >
        <m.div variants={varFade().inRight}>
          <Button
            component={RouterLink}
            color="inherit"
            size="large"
            variant="contained"
            rel="noopener"
            to={'/contact-us'}
            sx={{
              color: 'grey.800',
              bgcolor: 'common.white',
            }}
          >
            Subscribe
          </Button>
        </m.div>

        <m.div variants={varFade().inRight}>
          <Button
            color="inherit"
            size="large"
            variant="outlined"
            target="_blank"
            rel="noopener"
            href={'https://tg-demo-bot.vercel.app/'}
            endIcon={<Iconify icon="eva:external-link-fill" width={16} sx={{ mr: 0.5 }} />}
            sx={{ color: 'common.white', '&:hover': { borderColor: 'currentColor' } }}
          >
            Get Latest Version
          </Button>
        </m.div>
      </Stack>
    </Box>
  );
}

// ----------------------------------------------------------------------

function Content() {
  return (
    <Stack component={m.div} variants={varFade().inUp} alignItems="center">
      <m.div
        animate={{
          y: [-20, 0, -20],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Image
          visibleByDefault
          disabledEffect
          alt="rocket"
          src="/assets/images/robot3.png"
          sx={{ maxWidth: 460, p: 3 }}
        />
        {/* <Iconify icon="teenyicons:robot-outline" width={300} sx={{ m: 10 }} /> */}
      </m.div>
    </Stack>
  );
}

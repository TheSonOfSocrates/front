import { m, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled, alpha, useTheme } from '@mui/material/styles';
import {
  Button,
  Box,
  Link,
  Container,
  Typography,
  Stack,
  Grid,
  Rating,
  Hidden,
} from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_FIGMA_PREVIEW, PATH_FREE_VERSION } from '../../routes/paths';
// hooks
import useResponsive from '../../hooks/useResponsive';
// utils
import { textGradient, bgGradient } from '../../utils/cssStyles';
// config
import { HEADER } from '../../config-global';
// components
import SvgColor from '../../components/svg-color';
import Iconify from '../../components/iconify';
import { MotionContainer, varFade } from '../../components/animate';
import { useSettingsContext } from 'components/settings//SettingsContext';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  ...bgGradient({
    imgUrl: '/assets/background/overlay_2.jpg',
  }),
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    position: 'fixed',
  },
}));

const StyledDescription = styled('div')(({ theme }) => ({
  padding: '0 120px',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '50%',
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  // padding: theme.spacing(15, 0),
  height: '100%',
  // backdropFilter: 'blur(10px)',
  [theme.breakpoints.down('md')]: {
    position: 'relative',
    marginTop: 24,
    padding: '0 0',
    margin: 'inherit',
    width: '100%',
  },
  [theme.breakpoints.down('xl')]: {
    padding: '0 40px',
    marginTop: 24,
  },
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  const { scrollYProgress } = useScroll();
  const { themeMode, onToggleMode } = useSettingsContext();

  const [hide, setHide] = useState(false);

  useEffect(
    () =>
      scrollYProgress.on('change', (scrollHeight) => {
        if (scrollHeight > 0.8) {
          setHide(true);
        } else {
          setHide(false);
        }
      }),
    [scrollYProgress]
  );

  return (
    <>
      <StyledRoot sx={{ ...(hide && { opacity: 0 }),  background: `url(/assets/background/bg-${themeMode}.svg)` }}>
        {/* <video autoPlay muted loop playsInline width="100%">
          <source src="/assets/videos/hero.mp4" />
        </video> */}
        <Hidden mdDown>
          <Container component={MotionContainer} sx={{ height: 1 }}>
            <Grid container spacing={10} sx={{ height: 1 }}>
              <Grid item xs={12} md={6} sx={{ height: 1 }}>
                <Description />
              </Grid>
            </Grid>
          </Container>
        </Hidden>
        <Hidden mdUp>
          <Stack
            alignItems="center"
            component={MotionContainer}
            sx={{ height: 1, width: 1, px: 2, marginTop: 15 }}
          >
            <Description />
          </Stack>
        </Hidden>
      </StyledRoot>

      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
}

// ----------------------------------------------------------------------

function Description() {
  return (
    <StyledDescription>
      <m.div variants={varFade().in}>
        <Typography
          sx={{
            fontWeight: 'bold',
            // textAlign: 'center',
            fontSize: { md: 30, lg: 50, xs: 24 },
            lineHeight: 1.1,
            mb: 2,
          }}
        >
          TG: Where Trading and Technology Development Meet
          {/* <Typography
            color="primary"
            fontWeight="bold"
            sx={{ fontSize: { xs: 32, md: 56 }, fontFamily: 'Relative' }}
          >
            Consulting Services and Developement
          </Typography>{' '}
          Get ahead of the curve with TG
          <Typography
            component="span"
            color="primary"
            fontWeight="bold"
            sx={{ fontSize: { xs: 32, md: 56 }, mb: 3, fontFamily: 'Relative' }}
          ></Typography> */}
        </Typography>
        {process.env.REACT_APP_MODE == 'stock' ? (
          <Typography sx={{ fontSize: { xs: 20, lg: 24 }, color: { lg: 'white' } }}>
            Try now for free our own developed state-of-the-art trading bot
          </Typography>
        ) : (
          <Typography sx={{ fontSize: { xs: 20, lg: 24 }, color: { lg: 'white' } }}>
            Try now for free our own developed state-of-the-art trading bot fully implemented on
            <Typography component="span" fontSize={24} color="warning.main">
              {' '}
              Binance
            </Typography>{' '}
            Trading Platform
          </Typography>
        )}
      </m.div>

      <Hidden mdDown>
        <m.div variants={varFade().in}>
          <Stack
            spacing={0.75}
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ my: 3 }}
          >
            <Rating readOnly value={4.95} precision={0.1} max={5} />
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              <Box component="strong" sx={{ mr: 0.5, color: 'text.primary' }}>
                4.95/5
              </Box>
              (99+ reviews)
            </Typography>
          </Stack>
        </m.div>
      </Hidden>
      <m.div variants={varFade().in}>
        <Stack spacing={1.5} direction="row" sx={{ mb: 5, mt: 2 }}>
          <Stack alignItems="center" spacing={2}>
            <Button
              component={RouterLink}
              to={'/auth/register'}
              color="inherit"
              size="large"
              variant="contained"
              startIcon={<Iconify icon="eva:flash-fill" width={24} />}
              sx={{
                // bgcolor: 'grey.800',
                color: 'success.main',
                // color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                '&:hover': {
                  bgcolor: 'text.primary',
                },
              }}
            >
              Start Your Free Trial
            </Button>
          </Stack>

          <Button
            color="inherit"
            size="large"
            variant="outlined"
            startIcon={<Iconify icon="eva:external-link-fill" width={24} />}
            target="_blank"
            href="https://test.tg-investment.com/"
            // component={RouterLink}
            // to={'/auth/register'}
            sx={{ borderColor: 'white', color: 'success.main' }}
          >
            Launch App
          </Button>
        </Stack>
      </m.div>
    </StyledDescription>
  );
}
// ----------------------------------------------------------------------

import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Grid, Button, Container, Typography, Stack } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// utils
import { fPercent } from '../../utils/formatNumber';
// _mock_
import { _skills } from '../../_mock/arrays';
// components
import Image from '../../components/image';
import Iconify from '../../components/iconify';
import { MotionViewport, varFade } from '../../components/animate';
import { Contents } from 'assets/data/contents';
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  textAlign: 'center',
  paddingTop: theme.spacing(20),
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
  },
}));

// ----------------------------------------------------------------------

export default function Service() {
  const theme = useTheme();

  const isDesktop = useResponsive('up', 'md');

  const isLight = theme.palette.mode === 'light';

  const shadow = `-40px 40px 80px ${alpha(
    isLight ? theme.palette.grey[500] : theme.palette.common.black,
    0.48
  )}`;

  return (
    <StyledRoot>
      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <m.div variants={varFade().inRight}>
          <Typography variant="h1" sx={{ mb: 3 }}>
            Why our bot is superior and unmatched in comparison to others:
          </Typography>
        </m.div>
        {/* {isDesktop && (
          <Grid item xs={12} md={6} lg={7} sx={{ pr: { md: 7 } }}>
            <Grid container spacing={3} alignItems="flex-end">
              <Grid item xs={6}>
                <m.div variants={varFade().inUp}>
                  <Image
                    alt="our office 1"
                    src="/assets/images/1.png"
                    sx={{
                      borderRadius: 2,
                      boxShadow: shadow,
                    }}
                  />
                </m.div>
              </Grid>
              <Grid item xs={6}>
                <m.div variants={varFade().inUp}>
                  <Image
                    alt="our office 2"
                    src="/assets/images/5.png"
                    sx={{ borderRadius: 2, boxShadow: shadow }}
                  />
                </m.div>
              </Grid>
              <Grid item xs={6}>
                <m.div variants={varFade().inUp}>
                  <Image
                    alt="our office 1"
                    src="/assets/images/3.png"
                    sx={{
                      borderRadius: 2,
                      boxShadow: shadow,
                    }}
                  />
                </m.div>
              </Grid>
              <Grid item xs={6}>
                <m.div variants={varFade().inUp}>
                  <Image
                    alt="our office 2"
                    src="/assets/images/4.png"
                    sx={{ borderRadius: 2, boxShadow: shadow }}
                  />
                </m.div>
              </Grid>
            </Grid>
          </Grid>
        )} */}
        <Stack alignItems="center" spacing={3}>
          <m.div variants={varFade().inUp}>
            <Image
              alt="our office 1"
              src="/assets/images/special/1.png"
              sx={{
                width: { lg: 800, xs: 1 },
                borderRadius: 2,
                boxShadow: shadow,
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
                boxShadow: shadow,
              }}
            />
          </m.div>
        </Stack>

        <Stack spacing={3} mt={10}>
          {Contents.specials.map((item, index) => (
            <m.div variants={varFade().inRight}>
              <Typography
                variant="h5"
                sx={{
                  color: theme.palette.mode === 'light' ? 'text.secondary' : 'common.white',
                }}
              >
                {index + 1}. {item.title}: {item.text}
              </Typography>
            </m.div>
          ))}
        </Stack>
      </Container>

      {/* <Box
        component="img"
        src="/assets/icons/3d/thumbup.png"
        sx={{ position: 'absolute', width: 140, top: '10%', left: 30 }}
      />

      <Box
        component="img"
        src="/assets/icons/3d/star.png"
        sx={{ position: 'absolute', width: 140, top: '30%', right: 30 }}
      />

      <Box
        component="img"
        src="/assets/icons/3d/dollar.png"
        sx={{ position: 'absolute', width: 140, top: '50%', left: 100 }}
      />

      <Box
        component="img"
        src="/assets/icons/3d/shield.png"
        sx={{ position: 'absolute', width: 140, top: '60%', right: 300 }}
      />
      <Box
        component="img"
        src="/assets/icons/3d/gift.png"
        sx={{ position: 'absolute', width: 140, top: '80%', right: '30%' }}
      />
      <Box
        component="img"
        src="/assets/icons/3d/rocket.png"
        sx={{ position: 'absolute', width: 140, top: '90%', left: '30%' }}
      /> */}
    </StyledRoot>
  );
}

function Content() {
  return (
    <Box sx={{ position: 'relative' }}>
      {[...Array(7)].map((_, index) => (
        <Box
          key={index}
          component={m.div}
          variants={varFade().inUp}
          sx={{
            top: 0,
            left: 0,
            position: 'absolute',
            ...(index === 0 && { zIndex: 8 }),
            ...(index === 5 && { position: 'relative', zIndex: 9 }),
          }}
        >
          <Image
            disabledEffect
            alt={`clean-${index + 1}`}
            src={`/assets/images/home/clean_${index + 1}.png`}
          />
        </Box>
      ))}
    </Box>
  );
}

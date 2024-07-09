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
      <Container>
        <m.div variants={varFade().inRight}>
          <Typography variant="h1" sx={{ mb: 3 }}>
            Our Services{' '}
          </Typography>
        </m.div>
        {/* <Grid container spacing={3} alignItems="stretch">
          <Grid item sm={6} xs={12}>
            <Box
              component="img"
              alt="our office 1"
              src="/assets/images/service/1.png"
              sx={{ borderRadius: 2, boxShadow: shadow }}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <Box
              component="img"
              alt="our office 2"
              src="/assets/images/service/2.png"
              sx={{ borderRadius: 2, boxShadow: shadow }}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <Box
              component="img"
              alt="our office 1"
              src="/assets/images/service/3.png"
              sx={{ borderRadius: 2, boxShadow: shadow }}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <Box
              component="img"
              alt="our office 2"
              src="/assets/images/service/4.png"
              sx={{ borderRadius: 2, boxShadow: shadow }}
            />
          </Grid>
        </Grid> */}
        <Stack spacing={3} mt={10}>
          {Contents.services.map((item, index) => (
            <Stack spacing={1}>
              <m.div variants={varFade().inRight}>
                <Typography
                  variant="h4"
                  sx={{
                    color: theme.palette.mode === 'light' ? 'text.secondary' : 'common.white',
                  }}
                >
                  {item.title}
                </Typography>
              </m.div>
              <m.div variants={varFade().inRight}>
                <Typography
                  sx={{
                    color: theme.palette.mode === 'light' ? 'text.secondary' : 'common.white',
                  }}
                >
                  {item.text}
                </Typography>
              </m.div>
            </Stack>
          ))}
        </Stack>
      </Container>
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

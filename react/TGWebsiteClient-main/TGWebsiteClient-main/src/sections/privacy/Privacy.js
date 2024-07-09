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
            Privacy Policy
          </Typography>
        </m.div>
        <Stack spacing={3} mt={10}>
          <Stack spacing={1}>
            <m.div variants={varFade().inRight}>
              <Typography
                variant="h4"
                sx={{
                  color: theme.palette.mode === 'light' ? 'text.secondary' : 'common.white',
                }}
              >
                Custom Trading Bots
              </Typography>
            </m.div>
            <m.div variants={varFade().inRight}>
              <Typography
                sx={{
                  color: theme.palette.mode === 'light' ? 'text.secondary' : 'common.white',
                }}
              >
                We can create completely custom trading bots to suit your specific needs. From
                profit targets to risk levels, we will deliver a custom solution that reflects your
                trading approach. A 24/7 profit generating, AI driven machine working to build your
                wealth. Our bots are 100% bulletproof, and you can enjoy FREE setup on your own
                private VPS/Server or Localhost depending on your needs. That means you always have
                control of security for complete confidence in everything you do. Whatever you are
                looking for from cryptocurrency trading, our custom bot solutions will help you
                achieve your goals. Because a bot can do this automatically, you are free to carry
                on with your normal daily schedule, knowing that your bot is working for you all the
                time, so you never miss a trading opportunity. With every bot 100% tested and built
                using our unique logic and algorithms, you can trade with confidence, every day. To
                discuss your needs and enjoy a custom bot designed to deliver success for you, just
                get in touch today.
              </Typography>
            </m.div>
          </Stack>

          <Stack spacing={1}>
            <m.div variants={varFade().inRight}>
              <Typography
                variant="h4"
                sx={{
                  color: theme.palette.mode === 'light' ? 'text.secondary' : 'common.white',
                }}
              >
                Blockchain Development and API integration to any related services
              </Typography>
            </m.div>
            <m.div variants={varFade().inRight}>
              <Typography
                sx={{
                  color: theme.palette.mode === 'light' ? 'text.secondary' : 'common.white',
                }}
              >
                As a dedicated software developer, we are committed to new technologies such as
                Blockchain, but also offer comprehensive development solutions for more established
                platforms such as Solidity, Rust, Go, Python, NodeJS and ReactJS. Our services
                include full, end-to-end development of dedicated applications, including complete
                front and back-end development, QA testing and rollout of the project, along with
                our comprehensive support post-integration.
              </Typography>
            </m.div>
          </Stack>

          <Stack spacing={1}>
            <m.div variants={varFade().inRight}>
              <Typography
                variant="h4"
                sx={{
                  color: theme.palette.mode === 'light' ? 'text.secondary' : 'common.white',
                }}
              >
                Experienced NFT and Token developers
              </Typography>
            </m.div>
            <m.div variants={varFade().inRight}>
              <Typography
                sx={{
                  color: theme.palette.mode === 'light' ? 'text.secondary' : 'common.white',
                }}
              >
                Our team specialises in developing innovative Non-Fungible Tokens (NFTs) tailored to
                your specific needs. We can help you take advantage of the NFT environment to
                promote a buisness or project, or develop an investment vehicle that can help you
                raise funds without the need for lending. We can guide you through the development
                process to ensure that you use NFTs in the most effective way possible for the
                outcomes you want We have extensive experience in the NFT market, including the
                various platforms and their suitability for a variety of projects. Token Development
                If you need a token to incorporate into a project, we can help you through all
                aspects of development, from choice of Blockchain through the code itself. We also
                provide full support from your new token, and work with you to ensure your project
                is successful, including guidance and assistance throughout the initial launch and
                beyond.
              </Typography>
            </m.div>
          </Stack>
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

import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { m, useScroll, useSpring } from 'framer-motion';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Stack } from '@mui/material';
// sections
import {
  HomeHero,
  HomeMinimal,
  HomeSection1,
  HomeSection2,
  HomeSection4,
  HomeAdvertisement,
  HomeBanner,
  HomeMobileDownload,
  HomeHelps,
  HomeFeatures,
  HomeExchanges,
  HomeFooterBanner,
  HomeSpecialise,
  HomeDiagram,
} from '../sections/home';
import { useSettingsContext } from 'components/settings//SettingsContext';
// ----------------------------------------------------------------------

export default function HomePage() {
  const theme = useTheme();
  const { themeMode, onToggleMode } = useSettingsContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  // if (loading) {
  //   return (
  //     <Stack
  //       sx={{
  //         position: 'absolute',
  //         width: '100vw',
  //         height: '100vh',
  //         top: 0,
  //         right: 0,
  //         zIndex: 9999,
  //         bgcolor: 'black',
  //       }}
  //     >
  //       <Box
  //         component="video"
  //         src="/loading.webm"
  //         autoPlay
  //         loop
  //         muted
  //         playsInline
  //         sx={{ width: 1, height: 1 }}
  //       />
  //     </Stack>
  //   );
  // }

  return (
    <>
      <Helmet>
        <title> TG </title>
      </Helmet>

      <HomeHero />

      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        <Stack sx={{ background: `url(/assets/background/bg-${themeMode}.svg)` }}>
          <HomeMinimal />

          <HomeBanner />

          <HomeDiagram />

          <HomeSpecialise />

          <HomeSection1 />

          {/* <HomeExchanges /> */}

          <HomeHelps />

          <HomeFeatures />

          {/* <HomeMobileDownload /> */}
          <Stack sx={{ background: `url(/assets/background/banner-${themeMode}.svg)` }}>
            <HomeFooterBanner />
          </Stack>
          <HomeSection2 />

          {/*<HomeSection4 />*/}
        </Stack>
        {/* <HomeAdvertisement /> */}

        <Helmet>
          <script src="//code.tidio.co/fidmn52qwy4oy15oseecqdcqu0neks5v.js" async></script>
        </Helmet>
      </Box>
    </>
  );
}

import { Link as RouterLink, useLocation } from 'react-router-dom';
// @mui
import { Box, Grid, Link, Stack, Divider, Container, Typography, IconButton } from '@mui/material';
import { useSettingsContext } from 'components/settings//SettingsContext';
// routes
import { PATH_PAGE } from '../../routes/paths';
// _mock
import { _socials } from '../../_mock/arrays';
// components
import Logo from '../../components/logo';
import Iconify from '../../components/iconify';
import Privacy from './Privacy.pdf';
import Terms from './Terms.pdf';
// ----------------------------------------------------------------------

const LINKS = [
  {
    headline: 'Minimal',
    children: [
      { name: 'About us', href: '/about-us' },
      { name: 'Contact us', href: '/contact-us' },
      { name: 'FAQs', href: '/faqs' },
    ],
  },
  {
    headline: 'Legal',
    children: [
      { name: 'Terms and Condition', href: Terms },
      { name: 'Privacy Policy', href: Privacy },
    ],
  },
  {
    headline: 'Contact',
    children: [
      { name: 'tgblockchaininvest@gmail.com', href: '#' },
      // { name: '10 Agiou Demetriou Lemesos 4527', href: '#' },
    ],
  },
];

// ----------------------------------------------------------------------

export default function Footer() {
  const { pathname } = useLocation();
  const { themeMode, onToggleMode } = useSettingsContext();
  const isHome = pathname === '/';

  const mainFooter = (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        bgcolor: 'background.default',
        background: `url(/assets/background/map-${themeMode}.svg)`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* <Divider /> */}

      <Container sx={{ pt: 10 }}>
        <Grid
          container
          justifyContent={{
            xs: 'center',
            md: 'space-between',
          }}
          sx={{
            textAlign: {
              xs: 'center',
              md: 'left',
            },
          }}
        >
          <Grid item xs={8} md={3}>
            <Typography variant="body2" sx={{ pr: { md: 5 } }}>
              TG is a Leading Trading & Development Company with unique Services/ Tools.
            </Typography>

            <Stack
              spacing={1}
              direction="row"
              justifyContent={{ xs: 'center', md: 'flex-start' }}
              sx={{
                mt: 5,
                mb: { xs: 5, md: 0 },
              }}
            >
              {_socials.map((social) => (
                <IconButton key={social.name}>
                  <Iconify icon={social.icon} />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={7}>
            <Stack
              spacing={5}
              justifyContent="space-between"
              direction={{ xs: 'column', md: 'row' }}
            >
              {LINKS.map((list) => (
                <Stack
                  key={list.headline}
                  spacing={2}
                  alignItems={{ xs: 'center', md: 'flex-start' }}
                >
                  <Typography component="div" variant="overline">
                    {list.headline}
                  </Typography>

                  {list.children.map((link) =>
                    list.headline == 'Legal' ? (
                      <Link
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        color="inherit"
                        variant="body2"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <Link
                        key={link.name}
                        component={RouterLink}
                        to={link.href}
                        color="inherit"
                        variant="body2"
                      >
                        {link.name}
                      </Link>
                    )
                  )}
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>
        <Stack spacing={1} mt={5}>
          <Typography variant="caption">
            The purpose of this website is solely to display information regarding the products and
            services available on the TG-investment.com. It is not intended to offer access to any
            of such products and services. You may obtain access to such products and services on
            the TG-imvestment.com.
          </Typography>
          <Typography variant="caption">
            Please note that the availability of the products and services on the TG-investment.com
            is subject to jurisdictional limitations. TG-investment.com may not offer certain
            products, features and/or services on the TG-investment website in certain jurisdictions
            due to potential or actual regulatory restrictions.
          </Typography>
          <Typography variant="caption">
            TG-investment.com is a company incorporated in Cyprus with Company number (HE430023)
            trading under the name “TG-investment.com”. TG-investment.com is Limited is authorised
            to provide the following services: 1. execution of orders for TG-investment.com using
            personal funds and personal account; 2. Consulting Trading & Development and 3. Project
            Development according to TG-investment.com services.
          </Typography>
          <Typography variant="caption">
            Any other product or service offered in the TG-investment.com and advertised on this
            website is provided by other group companies and does not fall within the
            TG-investment.com Limited regulated services.
            {/* Email: tgblockchaininvest@gmail.com |
            Office: 10 Agiou Demetriou, 4527 Moutagiaka, Lemesos , Cyprus */}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 3, pb: 5 }}
        >
          <Typography
            variant="caption"
            component="div"
            sx={{
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            © 2023. All rights reserved
          </Typography>
          <Logo sx={{ width: 80 }} />
        </Stack>
      </Container>
    </Box>
  );

  return mainFooter;
}

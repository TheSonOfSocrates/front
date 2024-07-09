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
// ----------------------------------------------------------------------
const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(5, 0),
  // [theme.breakpoints.up('md')]: {
  //   padding: theme.spacing(15, 0),
  // },
}));

const Products = [
  {
    title: 'PRODUCT 1',
    subTitle: 'TRADING BOT',
    text: 'This Product 1 which will be released in Q2 2023',
  },
  {
    title: 'PRODUCT 2',
    subTitle: 'NFT DEVELOPMENT',
    text: 'This Product 2 which will be released in Q3 2023',
  },
  {
    title: 'PRODUCT 3',
    subTitle: 'TOKEN DEVELOPMENT',
    text: 'This Product 3 which will be released in Q4 2023',
  },
];

// ----------------------------------------------------------------------

export default function HomeMinimal() {
  return (
    <StyledRoot>
      <Container>
        <Stack
          alignItems="center"
          spacing={3}
          sx={{
            textAlign: 'center',
            mb: { xs: 5, md: 10 },
          }}
        >
          <m.div variants={varFade().inDown}>
            <Typography variant="h2">Pioneer's next generation product development</Typography>
          </m.div>
          {/* <m.div variants={varFade().inDown}>
            <Typography>
              Lorem ipsum is simply dummy text of the prinitng and typesetting industry.
            </Typography>
          </m.div> */}
          <Stack sx={{ width: { lg: 0.8, xl: 1 } }}>
            <m.div variants={varFade().inDown}>
              <Stack mt={10}>
                <Grid container spacing={3}>
                  {Products.map((item, index) => (
                    <Grid item key={index} md={4} sm={12}>
                      <Stack
                        alignItems="center"
                        sx={{
                          py: 10,
                          borderRadius: 3,
                          background: 'linear-gradient(#ffffff10, #000000)',
                          pt: 10,
                          width: 1,
                        }}
                      >
                        <Stack sx={{ px: 4 }} alignItems="center" spacing={2}>
                          <Iconify icon="ic:sharp-star" width={40} color="primary.main" />
                          <Typography variant="h4" color="primary">
                            {item.title}
                          </Typography>
                          <Typography variant="h5" color="primary.light">
                            {item.subTitle}
                          </Typography>
                          <Typography>{item.text}</Typography>
                          <Button
                            component={RouterLink}
                            to={PATH_AUTH.register}
                            color="primary"
                            variant="contained"
                            sx={{ borderRadius: 5, width: 160, height: 48, color: 'white', mt: 3 }}
                          >
                            Learn More
                          </Button>
                        </Stack>
                        <Box
                          component="img"
                          src={`/assets/images/product${index + 1}.png`}
                          sx={{ width: 1, mt: { md: 10, xs: 20 } }}
                        />
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            </m.div>
          </Stack>
        </Stack>
      </Container>
    </StyledRoot>
  );
}

import { m } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Container, Typography, Stack, Button, Grid } from '@mui/material';
// components
import Image from '../../components/image';
import { MotionViewport, varFade } from '../../components/animate';
import { PATH_AUTH } from 'routes/paths';
import { Contents } from 'assets/data/contents';

// ----------------------------------------------------------------------
const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  // [theme.breakpoints.up('md')]: {
  //   padding: theme.spacing(15, 0),
  // },
}));

// ----------------------------------------------------------------------

export default function HomeHelps() {
  console.log('contents', Contents);
  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <Stack mb={5}>
          <Typography variant="h2">
            Profitable trading strategies exist for all market conditions.
          </Typography>
          {/* <Typography>
            For every market condition, there’s a trading strategy that can profit from it. TG bots
            happen to be really good at reducing average acquisition costs, directly increasing your
            profit margins from each trade.
          </Typography> */}
        </Stack>
        <Grid container spacing={10}>
          {Contents.homeHelps.map((item, index) => (
            <Grid item md={4} key={index}>
              <Stack>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box sx={{ width: 20, height: 2, bgcolor: 'white' }} />
                  <Typography>{item.title}</Typography>
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
            Start Your Free Trial
          </Button>
        </Stack>
      </Container>
    </StyledRoot>
  );
}

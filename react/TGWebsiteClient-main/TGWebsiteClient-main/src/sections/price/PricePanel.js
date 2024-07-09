import PropTypes from 'prop-types';
// @mui
import { alpha, styled, useTheme } from '@mui/material/styles';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  LinearProgress,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tab,
  Typography,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Switch from '@mui/material/Switch';
import Modal from '@mui/material/Modal';
import { TabContext, TabList, TabPanel } from '@mui/lab';
// hooks
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect, useState } from 'react';
// utils
import { fPercent } from '../../utils/formatNumber';
import {
  getPaymentInfo,
  getPlans,
  setLicenseKey,
  setPaymentStatus,
  setSelectedPlanId,
  cancelOrder,
  setPriceDlgOpen,
} from '../../redux/slices/price';
import { useNavigate } from 'react-router-dom';
// _mock_
// components
import { MotionViewport } from '../../components/animate';
import StripeCheckoutForm from '../../components/checkout-form/stripe/StripeCheckoutForm';
import PayPayCheckoutForm from '../../components/checkout-form/paypal/PayPalCheckoutForm';
// icons
import AutoFixOffOutlinedIcon from '@mui/icons-material/AutoFixOffOutlined';
import AutoFixNormalOutlinedIcon from '@mui/icons-material/AutoFixNormalOutlined';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import SupportIcon from '../../assets/icons/SupportIcon';
import UnSupportIcon from '../../assets/icons/UnSupportIcon';
import { ReactComponent as CardIcon } from '../../assets/img/card.svg';
import { ReactComponent as PaypalIcon } from '../../assets/img/paypal.svg';
import { ReactComponent as CryptoCurrencyIcon } from '../../assets/img/cryptocurrency.svg';
import { HOST_API_KEY } from '../../config-global';
import { AuthContext } from '../../auth/JwtContext';
import Coinpayments from 'components/checkout-form/coinpayments/Coinpayments';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  textAlign: 'center',
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
  },
}));

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  maxWidth: '700px',
  bgcolor: 'background.paper',
  border: '2px solid #15b3b2',
  borderRadius: 3,
  boxShadow: 24,
  p: 2,
};

// ----------------------------------------------------------------------

export default function PricePanel() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const [selectedPrice, setSelectedPrice] = useState();
  const [monthlyMode, setMonthlyMode] = useState(true);
  const [payToolIndex, setPayToolIndex] = useState('1');

  const { plans, paymentStatus, selectedPlanId, priceDlgOpen } = useSelector((state) => state.price);

  const isLight = theme.palette.mode === 'light';

  const shadow = `-40px 40px 80px ${alpha(
    isLight ? theme.palette.grey[500] : theme.palette.common.black,
    0.48,
  )}`;

  const displayContent = {
    'badge': 'WELCOME',
    'header-p1': 'TG',
    'header-p2': 'trading bots',
    'description': 'Make more money, and enjoy life.',
  };

  const popularPlanIndex = 1;

  const planStyles = [
    {
      'icon': <AutoFixOffOutlinedIcon />,
      'color': 'warning',
    },
    {
      'icon': <AutoFixNormalOutlinedIcon />,
      'color': 'info',
    },
    {
      'icon': <AutoFixHighOutlinedIcon />,
      'color': 'success',
    },
  ];

  useEffect(() => {
    dispatch(getPlans());
    dispatch(getPaymentInfo());
  }, [dispatch]);

  const handlePlanSelected = (planId) => {

    if (!authContext.isAuthenticated) {
      navigate('/auth/login');
      return;
    }

    if (paymentStatus === 'Not' || (paymentStatus === 'Ordered' && planId !== selectedPlanId)) {
      plans.forEach(function(plan) {
        if (plan['_id'] === planId) {
          setSelectedPrice(monthlyMode ? plan['price_monthly'] : plan['price_yearly'] * 12);
        }
      });

      if (paymentStatus === 'Not')
        dispatch(setSelectedPlanId(planId));

      dispatch(setPriceDlgOpen(true));
    } else if (paymentStatus === 'Ordered') {
      dispatch(cancelOrder());
    }
  };
  const closePurchaseDlg = () => {
    dispatch(setPriceDlgOpen(false));
  };

  const handlePayModeChanged = () => {
    setMonthlyMode(!monthlyMode);
  };

  const handlePayToolChanged = (event, newValue) => {
    setPayToolIndex(newValue);
  };

  const handleLearnMore = (e, planId) => {
    e.preventDefault();
    if (!authContext.isAuthenticated) {
      navigate('/auth/login');
    } else {

    }
  };

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      left: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' height='20' width='20' viewBox='0 0 20 20'><path fill='${encodeURIComponent(
            '#fff',
          )}' d='M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z'/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#364959' : '#658096',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#139d9d' : '#42c1c1',
      width: 32,
      height: 32,
      '&:before': {
        content: '\'\'',
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' height='20' width='20' viewBox='0 0 20 20'><path fill='${encodeURIComponent(
          '#fff',
        )}' d='M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z'/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#364959' : '#6a7286',
      borderRadius: 20 / 2,
    },
  }));

  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <Box py={8} textAlign='center'>
          <Box mb={3}>
            <Container maxWidth='sm'>
              <Typography variant='overline' color='textSecondary'>{displayContent['badge']}</Typography>
              <Typography variant='h3' component='h2' gutterBottom={true}>
                <Typography variant='h3' component='span'
                            color='primary'>{displayContent['header-p1']} </Typography>
                <Typography variant='h3' component='span'>{displayContent['header-p2']}</Typography>
              </Typography>
              <Typography variant='subtitle1' color='textSecondary'
                          paragraph={true}>{displayContent['description']}</Typography>
            </Container>
          </Box>
          <FormGroup sx={{ alignItems: 'end', marginBottom: 3 }}>
            <FormControlLabel
              control={<MaterialUISwitch />}
              onChange={handlePayModeChanged}
              label={monthlyMode ? 'Monthly' : 'Yearly'}
              checked={!monthlyMode}
              labelPlacement='start'
            />
          </FormGroup>
          <Grid container spacing={6}>
            {
              plans.map((plan, planIndex) => (
                <Grid item xs={12} md={4} key={planIndex}>
                  <Paper sx={{ boxShadow: isLight ? shadow : '' }} elevation={isLight ? 0 : 10}
                         style={{ position: 'relative' }}>
                    {
                      popularPlanIndex === planIndex &&
                      <div style={{
                        top: '-6px',
                        right: '-6px',
                        width: '140px',
                        height: '140px',
                        overflow: 'hidden',
                        position: 'absolute',
                      }}>
                        <img src={'/assets/images/price/bestoffer.png'}></img>
                      </div>
                    }
                    <Box px={1}>
                      <Chip icon={planStyles[planIndex].icon} label={plan['name']} variant='outlined'
                            color={planStyles[planIndex].color}
                            onClick={() => {
                            }}
                            sx={{
                              marginTop: 8,
                              marginBottom: 3,
                              padding: '30px 10px',
                              fontSize: 25,
                            }} />
                      <Typography variant='h3' component='h2' gutterBottom={true}>
                        {'$ ' + (monthlyMode ? plan['price_monthly'] : plan['price_yearly'])}
                        <Typography variant='h6' color='textSecondary'
                                    component='span'>
                          {plan['suffix']}
                        </Typography>
                      </Typography>
                      <Box mt={2} sx={{ marginBottom: 3 }}>
                        <Button variant='contained'
                                color={(selectedPlanId === plan['_id'] && paymentStatus === 'Ordered') ? 'error' : 'success'}
                                disabled={selectedPlanId === plan['_id'] && paymentStatus === 'Purchased'}
                                onClick={() => handlePlanSelected(plan['_id'])}>
                          {(selectedPlanId !== plan['_id'] || paymentStatus === 'Not') ? 'Select Plan' : ''}
                          {(selectedPlanId === plan['_id'] && paymentStatus === 'Ordered') ? 'Cancel Order' : ''}
                          {(selectedPlanId === plan['_id'] && paymentStatus === 'Purchased') ? 'Purchased' : ''}
                        </Button>
                      </Box>
                      <Typography
                        sx={{ display: 'inline' }}
                        component='span'
                        variant='h5'
                        color='text.secondary'>
                        Benefits
                      </Typography>
                      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {
                          plan.benefits.map((benefit, benefitIndex) => (
                            <div key={planIndex + '-' + benefitIndex}>
                              <ListItem alignItems='flex-start'>
                                <ListItemAvatar>
                                  <Avatar>
                                    {benefit['supported'] && <SupportIcon></SupportIcon>}
                                    {!benefit['supported'] && <UnSupportIcon></UnSupportIcon>}
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                  primary={benefit['title']}
                                  secondary={
                                    <>
                                      <Typography
                                        sx={{ display: 'inline' }}
                                        component='span'
                                        variant='body2'
                                        color='text.secondary'>
                                        {benefit['detail']}
                                      </Typography>
                                    </>
                                  }
                                />
                              </ListItem>
                              <Divider variant='inset' component='li' />
                            </div>
                          ))
                        }
                      </List>
                    </Box>
                    <Box mt={2}>
                      <Link href='PricePage#' color='primary' onClick={(e) => handleLearnMore(e, plan['_id'])}>Learn
                        More</Link>
                    </Box>
                    <br />
                  </Paper>
                </Grid>
              ))
            }
          </Grid>
        </Box>

        <Modal
          open={priceDlgOpen}
          onClose={closePurchaseDlg}>
          <Box sx={modalStyle}>
            <DialogTitle id='draggable-dialog-title'>
              {'Depositing $' + selectedPrice}
            </DialogTitle>
            <DialogContent>
              {paymentStatus === 'Not' && <Alert severity='warning'>
                {`You are going to activate "Starter" subscription for $ ${selectedPrice} per ${monthlyMode ? 'month' : 'year'}.`}
              </Alert>}
              {paymentStatus === 'Ordered' && <Alert severity='info'>Your order placed successfully.</Alert>}
              {paymentStatus === 'Purchased' &&
                <Alert severity='success'>Congratulations. You puchased successfully. Thanks for it.</Alert>}

              <TabContext value={payToolIndex}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', marginTop: 2 }}>
                  <TabList onChange={handlePayToolChanged} variant='fullWidth'>
                    <Tab icon={<CardIcon />} value='1' />
                    <Tab icon={<PaypalIcon></PaypalIcon>} value='2' />
                    <Tab icon={<CryptoCurrencyIcon></CryptoCurrencyIcon>} value='3' />
                  </TabList>
                </Box>
                <TabPanel value='1'>
                  <Box
                    sx={{
                      width: '100%',
                    }}>
                    <StripeCheckoutForm amount={selectedPrice} licensePeriod={monthlyMode ? 1 : 12} />
                  </Box>
                </TabPanel>
                <TabPanel value='2'>
                  <PayPayCheckoutForm amount={selectedPrice} licensePeriod={monthlyMode ? 1 : 12} />
                </TabPanel>
                <TabPanel value='3'>
                  <Coinpayments licensePeriod={monthlyMode ? 1 : 12} />
                </TabPanel>
              </TabContext>
            </DialogContent>
          </Box>
        </Modal>
      </Container>
    </StyledRoot>
  );
}

// ----------------------------------------------------------------------

ProgressItem.propTypes = {
  progress: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number,
  }),
};

function ProgressItem({ progress }) {
  const { label, value } = progress;

  return (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
        <Typography variant='subtitle2'>{label}&nbsp;-&nbsp;</Typography>
        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          {fPercent(value)}
        </Typography>
      </Box>

      <LinearProgress
        variant='determinate'
        value={value}
        sx={{
          '& .MuiLinearProgress-bar': { bgcolor: 'grey.700' },
          '&.MuiLinearProgress-determinate': { bgcolor: 'divider' },
        }}
      />
    </Box>
  );
}

// @mui
import { Card, CardContent, CardHeader, Grid } from '@mui/material';
// components
import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function NotificationSetting() {

  const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName='.Mui-focusVisible' disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      left: 0,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

  return (
    <>
      <Card>
        <CardHeader title='Notification' />
        <CardContent container>
          <Grid container spacing={3} sx={{ padding: 2 }}>
            <Grid item xs={12} sm={6} md={4}>
              <div>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 2 }} defaultChecked />}
                  label='Email me when someone follows me'
                />
              </div>
              <div>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 2 }} defaultChecked />}
                  label='Email me when someone answers on my post'
                />
              </div>
              <div>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 2 }} defaultChecked />}
                  label='Email me when someone mentions me'
                />
              </div>
              <div>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 2 }} defaultChecked />}
                  label='New launches and projects'
                />
              </div>

            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 2 }} defaultChecked />}
                  label='Monthly product updates'
                />
              </div>
              <div>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 2 }} defaultChecked />}
                  label='Subscribe to newsletter'
                />
              </div>
              <div>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 2 }} defaultChecked />}
                  label='Email me when someone follows me'
                />
              </div>
              <div>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 2 }} defaultChecked />}
                  label='Email me when someone answers on my post'
                />
              </div>

            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 2 }} defaultChecked />}
                  label='Email me when someone mentions me'
                />
              </div>
              <div>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 2 }} defaultChecked />}
                  label='New launches and projects'
                />
              </div>
              <div>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 2 }} defaultChecked />}
                  label='Monthly product updates'
                />
              </div>
              <div>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 2 }} defaultChecked />}
                  label='Subscribe to newsletter'
                />
              </div>

            </Grid>

          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
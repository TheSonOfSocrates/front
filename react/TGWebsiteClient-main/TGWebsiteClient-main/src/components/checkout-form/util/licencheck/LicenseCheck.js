import React, { forwardRef, useImperativeHandle } from 'react';
import { Alert, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { useSelector } from 'react-redux';

const LicenseCheck = forwardRef((props, ref) => {
  const [licenseAgreed, setLicenseAgreed] = React.useState(false);
  const [displayError, setDisplayError] = React.useState(false);

  const { paymentStatus } = useSelector((state) => state.price);

  useImperativeHandle(ref, () => ({
    checkLicenseStatus() {
      if (!licenseAgreed) {
        setDisplayError(true);
        return false;
      } else
        return true;
    },
    getLicenseStatus() {
      return licenseAgreed;
    },
  }));

  async function handleLicenseStatusChanged() {
    if (licenseAgreed) {
      setDisplayError(true);
    } else {
      setDisplayError(false);
    }
    await setLicenseAgreed(!licenseAgreed);
    if (props.handleLicenseStatusChanged)
      props.handleLicenseStatusChanged();
  }

  return <FormGroup>
    <FormControlLabel sx={{ marginBottom: 1 }}
                      control={<Checkbox disabled={paymentStatus !== 'Not'} checked={licenseAgreed}
                                         onChange={handleLicenseStatusChanged} />}
                      label='I accept Terms of use and agree to payment amount and accept Recurring Payment Policy and Refund Policy' />
    {displayError && <Alert severity='error' sx={{ marginTop: 1 }}>You need to agree with our license.</Alert>}
  </FormGroup>;
});

export default LicenseCheck;
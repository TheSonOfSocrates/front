import React, { useState } from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { PAYPAL_API_KEY } from '../../../config-global';
import LicenseCheck from '../util/licencheck/LicenseCheck';
import { confirmPaypalPayment, setPaymentStatus } from '../../../redux/slices/price';
import { dispatch } from '../../../redux/store';
import { useSelector } from 'react-redux';

const PayPayCheckoutForm = (props) => {
  const [refresh, setRefresh] = useState(false);
  const licenseRef = React.useRef();

  const { selectedPlanId, paymentStatus } = useSelector((state) => state.price);

  const createOrder = async (data, actions) => {
    return await actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: props.amount,
          },
        },
      ],
    });
  };

  // check Approval
  const onApprove = async (data, actions) => {
    const paymentIntent = await actions.order.capture();
    dispatch(setPaymentStatus('Ordered'));
    const licensePeriod = props.licensePeriod;
    dispatch(confirmPaypalPayment({ paymentIntent, licensePeriod, selectedPlanId }));
  };

  const onError = async (err) => {
    alert(err);
  };

  const handleLicenseStatusChanged = () => {
    setRefresh(!refresh);
  };

  return (
    <div>
      <LicenseCheck ref={licenseRef} handleLicenseStatusChanged={handleLicenseStatusChanged} />
      {licenseRef.current && licenseRef.current.getLicenseStatus() && paymentStatus === 'Not' &&
        <PayPalScriptProvider options={{ 'client-id': PAYPAL_API_KEY }}>
          <PayPalButtons
            style={{ layout: 'vertical' }}
            createOrder={createOrder}
            onError={onError}
            onApprove={onApprove} />
        </PayPalScriptProvider>}
    </div>

  );
};

export default PayPayCheckoutForm;
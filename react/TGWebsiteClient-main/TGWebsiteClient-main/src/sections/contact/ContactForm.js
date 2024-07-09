import { m } from 'framer-motion';
import { useDispatch } from 'react-redux';
// @mui
import { Button, Typography, TextField, Stack } from '@mui/material';
// components
import { MotionViewport, varFade } from '../../components/animate';
// form
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import { sendEmail } from 'redux/slices/user';
import { useSnackbar } from 'notistack';
// ----------------------------------------------------------------------

export default function ContactForm() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const ContactSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message is required'),
  });

  const defaultValues = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  const methods = useForm({
    resolver: yupResolver(ContactSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await dispatch(sendEmail(data));
      enqueueSnackbar('Your email sent successfully.', { variant: 'success' });
    } catch (error) {
      console.error(error);
      reset();
      setError('afterSubmit', {
        ...error,
        message: error.message || error,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack component={MotionViewport} spacing={5}>
        <m.div variants={varFade().inUp}>
          <Typography variant="h3">Feel free to contact us.</Typography>
        </m.div>

        <Stack spacing={3}>
          <m.div variants={varFade().inUp}>
            <RHFTextField name="name" label="Name" />
          </m.div>

          <m.div variants={varFade().inUp}>
            <RHFTextField name="email" label="Email" />
          </m.div>

          <m.div variants={varFade().inUp}>
            <RHFTextField name="subject" label="Subject" />
          </m.div>

          <m.div variants={varFade().inUp}>
            <RHFTextField name="message" label="Enter your message here." multiline rows={4} />
          </m.div>
        </Stack>

        <m.div variants={varFade().inUp}>
          <Button size="large" variant="contained" type="submit">
            Submit Now
          </Button>
        </m.div>
      </Stack>
    </FormProvider>
  );
}

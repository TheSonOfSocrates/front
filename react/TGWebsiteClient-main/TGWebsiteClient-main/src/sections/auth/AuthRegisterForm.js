import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Alert, IconButton, InputAdornment, MenuItem, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// components
import countryList from 'react-select-country-list';
import Iconify from '../../components/iconify';
import FormProvider, { RHFSelect, RHFTextField } from '../../components/hook-form';
import { PATH_AUTH } from 'routes/paths';

// ----------------------------------------------------------------------

export default function AuthRegisterForm() {
  const { register } = useAuthContext();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const countryArray = countryList()
    .getData()
    .map((country, index) => {
      return (
        <MenuItem value={country.label} key={index}>
          {country.label}
        </MenuItem>
      );
    });

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    birthday: Yup.string().required('Date of Brith required'),
    country: Yup.string().required('Country required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Passwords do not match'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    birthday: '',
    country: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
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
      if (register) {
        await register(data);
        navigate(PATH_AUTH.verify);
      }
    } catch (error) {
      console.error(error);
      reset();
      setError('afterSubmit', {
        ...error,
        message: error.message || error.error || error,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>
        {!!errors.afterSubmit && <Alert severity='error'>{errors.afterSubmit.message}</Alert>}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name='firstName' label='First name' />
          <RHFTextField name='lastName' label='Last name' />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name='birthday' label='Date of Birth' type='date' InputLabelProps={{ shrink: true }} />
          <RHFSelect name='country' label='Country' children={countryArray} />
        </Stack>
        <RHFTextField name='email' label='Email address' />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField
            name='password'
            label='Password'
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <RHFTextField
            name='confirmPassword'
            label='Confirm Password'
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <LoadingButton
          fullWidth
          color='inherit'
          size='large'
          type='submit'
          variant='contained'
          loading={isSubmitting || isSubmitSuccessful}
          sx={{
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            '&:hover': {
              bgcolor: 'text.primary',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            },
          }}
        >
          Create account
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}

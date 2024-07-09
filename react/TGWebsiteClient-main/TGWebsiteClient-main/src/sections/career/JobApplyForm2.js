import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Alert, IconButton, InputAdornment, MenuItem, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// components
import countryList from 'react-select-country-list';
import Iconify from '../../components/iconify';
import FormProvider, { RHFSelect, RHFTextField, RHFUpload } from '../../components/hook-form';
import { useSnackbar } from 'notistack';
// ----------------------------------------------------------------------

const PDFJS = window.pdfjsLib;

export default function JobApplyForm() {
  const navigate = useNavigate();
  const { applyJob2 } = useAuthContext();

  const [country, setCountry] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [passportFile, setPassportFile] = useState(null);
  const [selfieFile, setSelfieFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const countryArray = countryList()
    .getData()
    .map((country, index) => {
      return (
        <MenuItem value={country.label} key={index}>
          {country.label}
        </MenuItem>
      );
    });

  const CareerSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phoneNumber: Yup.string().required('Phone number required'),
    address: Yup.string().required('Address required'),
    city: Yup.string().required('City required'),
    state: Yup.string().required('State required'),
    country: Yup.string().required('Country required'),
    linkedinProfile: Yup.string().required('Linkedin profile required'),
    salary: Yup.string().required('Salary required'),
    startDate: Yup.string().required('StartDate required'),
    resume: Yup.string().required('Resume required'),
    passport: Yup.string().required('Passport required'),
    selfie: Yup.string().required('Selfie required'),
    video: Yup.string().required('Video required')
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    country: '',
    linkedinProfile: '',
    salary: '',
    startDate: '',
    resume: '',
    passport: '',
    selfie: '',
    video: '',
    portfolioLink: ''
  };

  const methods = useForm({
    resolver: yupResolver(CareerSchema),
    defaultValues,
  });

  const {
    setValue,
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods

  const handlePassportUpload = useCallback(
    (acceptedFiles) => {
      const passportFile = acceptedFiles[0];

      Object.assign(passportFile, {
        preview: URL.createObjectURL(passportFile),
      });

      if (passportFile) {
        setValue('passport', passportFile);
        setPassportFile(passportFile);
      }
    },
    // [setValue]
  );

  const handleSelfieUpload = useCallback(
    (acceptedFiles) => {
      const selfieFile = acceptedFiles[0];

      Object.assign(selfieFile, {
        preview: URL.createObjectURL(selfieFile),
      });

      if (selfieFile) {
        setValue('selfie', selfieFile);
        setSelfieFile(selfieFile);
      }
    },
    // [setValue]
  );

  const handleVideoUpload = useCallback(
    (acceptedFiles) => {
      const videoFile = acceptedFiles[0];

      Object.assign(videoFile, {
        preview: URL.createObjectURL(videoFile),
      });

      if (videoFile) {
        setValue('video', videoFile);
        setVideoFile(videoFile);
      }
    },
    // [setValue]
  );

  async function showPdf(file) {
    try {
      const uri = URL.createObjectURL(file);
      var pdf = await PDFJS.getDocument({ url: uri });
      const canvas = document.createElement("canvas");
      canvas.setAttribute("className", "canv");

      var page = await pdf.getPage(1);
      var viewport = page.getViewport({ scale: 3 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      var render_context = {
        canvasContext: canvas.getContext("2d"),
        viewport: viewport
      };
      await page.render(render_context).promise;

      const img = canvas.toDataURL("image/png");
      Object.assign(file, {
        preview: img,
      });

      setValue('resume', file);
      setResumeFile(file);
    } catch (error) {
      alert(error.message);
    }
  }

  const handleResumeUpload = useCallback(
    (acceptedFiles) => {
      const resumeFile = acceptedFiles[0];
      showPdf(resumeFile);
    },
    // [setValue]
  );

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setValue('country', e.target.value);
  }

  const resetPassport = () => {
    setValue('passport', undefined);
  }

  const resetSelfie = () => {
    setValue('selfie', undefined);
  }

  const resetVideo = () => {
    setValue('video', undefined);
  }

  const resetResume = () => {
    setValue('resume', undefined);
  }

  const onSubmit = async (data) => {
    try {
      if (applyJob2) {
        data['resume'] = resumeFile;
        data['passport'] = passportFile;
        data['selfie'] = selfieFile;
        data['video'] = videoFile;
        const response = await applyJob2(data);

        if (response && response.status === 200) {
          enqueueSnackbar('You applied successfully.', { variant: 'success' });
          reset();
          setCountry('');
          setResumeFile(undefined);
          setPassportFile(undefined);
        } else {
          enqueueSnackbar('Please input correctly.', { variant: 'error' });
        }
      } else {
        console.log('no job');
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
          <RHFTextField name='firstName' label='First name*' />
          <RHFTextField name='lastName' label='Last name*' />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name='email' label='Email address*' />
          <RHFTextField name='phoneNumber' label='Phone Number*' />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name='address' label='Address*' />
          <RHFTextField name='city' label='City*' />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name='state' label='State*' />
          <RHFSelect name='country' label='Country*' children={countryArray} value={country} onChange={handleCountryChange} />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name='linkedinProfile' label='Linkedin profile*' />
          <RHFTextField name='portfolioLink' label='Portfolio link' />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name='salary' label='Desired salary*' />
          <RHFTextField name='startDate' label='Earliest Start Date*' type='date' InputLabelProps={{ shrink: true }} />
        </Stack>

        <RHFUpload
          name="resume"
          onDrop={handleResumeUpload}
          onDelete={resetResume}
          accept="document"
          helperText={
            <Typography
              variant="caption"
              sx={{
                mt: 2,
                mx: 'auto',
                display: 'block',
                textAlign: 'center',
                color: 'text.secondary',
              }}
            >Please upload your resume or CV.<br />Allowed *.pdf
            </Typography>
          }
        />

        <RHFUpload
          name="passport"
          onDrop={handlePassportUpload}
          onDelete={resetPassport}
          accept="image"
          helperText={
            <Typography
              variant="caption"
              sx={{
                mt: 2,
                mx: 'auto',
                display: 'block',
                textAlign: 'center',
                color: 'text.secondary',
              }}
            >Please upload your passport or driving license.<br />Allowed *.jpeg, *.jpg, *.png, *.gif
            </Typography>
          }
        />

        <RHFUpload
          name="selfie"
          onDrop={handleSelfieUpload}
          onDelete={resetSelfie}
          accept="image"
          helperText={
            <Typography
              variant="caption"
              sx={{
                mt: 2,
                mx: 'auto',
                display: 'block',
                textAlign: 'center',
                color: 'text.secondary',
              }}
            >Please upload your selfie.<br />Allowed *.jpeg, *.jpg, *.png, *.gif
            </Typography>
          }
        />

        <RHFUpload
          name="video"
          onDrop={handleVideoUpload}
          onDelete={resetVideo}
          accept="video"
          helperText={
            <Typography
              variant="caption"
              sx={{
                mt: 2,
                mx: 'auto',
                display: 'block',
                textAlign: 'center',
                color: 'text.secondary',
              }}
            >Please upload your introduction video.<br />Allowed video files
            </Typography>
          }
        />

        <Stack sx={{ justifyContent: 'flex-end' }} direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <LoadingButton
            color='inherit'
            size='large'
            type='submit'
            variant='contained'
            sx={{
              bgcolor: 'text.primary',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
              '&:hover': {
                bgcolor: 'text.primary',
                color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
              },
            }}
          >
            Apply now
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
}

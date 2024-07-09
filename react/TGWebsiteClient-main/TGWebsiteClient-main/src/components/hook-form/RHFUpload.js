import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { FormHelperText } from '@mui/material';
//
import { UploadAvatar, Upload, UploadBox } from '../upload';

// ----------------------------------------------------------------------

RHFUploadAvatar.propTypes = {
  name: PropTypes.string,
};

// ----------------------------------------------------------------------

export function RHFUploadAvatar({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <UploadAvatar
            accept={{
              'image/*': [],
            }}
            error={!!error}
            file={field.value}
            {...other}
          />

          {!!error && (
            <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
              {error.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}

// ----------------------------------------------------------------------

RHFUploadBox.propTypes = {
  name: PropTypes.string,
};

export function RHFUploadBox({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <UploadBox files={field.value} error={!!error} {...other} />
      )}
    />
  );
}

// ----------------------------------------------------------------------

RHFUpload.propTypes = {
  name: PropTypes.string,
  multiple: PropTypes.bool,
  helperText: PropTypes.node,
  onDelete: PropTypes.func
};

export function RHFUpload({ name, multiple, helperText, accept, onDelete, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) =>
        multiple ? (
          <Upload
            multiple
            accept={
              accept === 'document'
                ? { 'application/pdf': [] }
                : accept === 'image'
                  ? { 'image/*': [] }
                  : accept === 'video'
                    ? { 'video/*': [] }
                    : undefined // Set to undefined for a generic file upload if needed
            }
            files={field.value}
            error={!!error}
            helperText={
              (!!error || helperText) && (
                <FormHelperText error={!!error} sx={{ px: 2 }}>
                  {error ? error?.message : helperText}
                </FormHelperText>
              )
            }
            {...other}
          />
        ) : (
          <Upload
            accept={
              accept === 'document'
                ? { 'application/pdf': [] }
                : accept === 'image'
                  ? { 'image/*': [] }
                  : accept === 'video'
                    ? { 'video/*': [] }
                    : undefined // Set to undefined for a generic file upload if needed
            } file={field.value}
            onDelete={onDelete}
            error={!!error}
            helperText={
              (!!error || helperText) && (
                <FormHelperText error={!!error} sx={{ px: 2 }}>
                  {error ? error?.message : helperText}
                </FormHelperText>
              )
            }
            {...other}
          />
        )
      }
    />
  );
}

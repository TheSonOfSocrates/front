import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Iconify from '../../components/iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../../sections/admin/blog';
// mock
import POSTS from '../../_mock/blog';
import NotificationSetting from '../../sections/profile/NotificationSetting';
import AccountInfo from '../../sections/profile/AccountInfo';
import PasswordChange from '../../sections/profile/PasswordChange';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function PasswordPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Blog | Minimal UI </title>
      </Helmet>

      <Grid container spacing={3} sx={{ padding: 2 }}>
        <Grid item xs={12} sm={12} md={12}>
          <NotificationSetting />
        </Grid>
      </Grid>

    </>
  );
}

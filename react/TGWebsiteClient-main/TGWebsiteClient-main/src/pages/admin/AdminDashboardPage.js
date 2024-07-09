import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid } from '@mui/material';
// components
// sections
import { AppCurrentVisits, WebsiteAccessInfoBlock, WebsiteAccessInfoGraph } from '../../sections/admin/dashboard';
import { useEffect, useState } from 'react';
import { getAccessCount } from '../../api/admin';

// ----------------------------------------------------------------------

export default function AdminDashboardPage() {
  const theme = useTheme();

  const [todayVisitCount, setTodayVisitCount] = useState(0);
  const [totalVisitCount, setTotalVisitCount] = useState(0);
  const [todayRegisterCount, setTodayRegisterCount] = useState(0);
  const [totalRegisterCount, setTotalRegisterCount] = useState(0);
  const [graphDate, setGraphDate] = useState(null);
  const [graphVisitCount, setGraphVisitCount] = useState(null);
  const [graphRegisterCount, setGraphRegisterCount] = useState(null);

  useEffect(() => {
    async function loadAccessCount() {
      const response = await getAccessCount();
      if (response.success) {
        setTodayVisitCount(response.todayVisitCount);
        setTotalVisitCount(response.totalVisitCount);
        setTodayRegisterCount(response.todayRegisterCount);
        setTotalRegisterCount(response.totalRegisterCount);
        setGraphDate(response.graphDate);
        setGraphVisitCount(response.graphVisitCount);
        setGraphRegisterCount(response.graphRegisterCount);
      } else {
        // TODO replace alert with notification
        alert(response.msg);
      }
    }

    loadAccessCount();
  }, []);

  return (
    <>
      <Helmet>
        <title> Admin | Dashboard </title>
      </Helmet>

      <Container maxWidth='xl'>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <WebsiteAccessInfoBlock title='Today visit count' total={todayVisitCount} color='error'
                                    icon={'ant-design:login-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <WebsiteAccessInfoBlock title='Total visit count' total={totalVisitCount} color='warning'
                                    icon={'ant-design:deployment-unit-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <WebsiteAccessInfoBlock title='Today register count' total={todayRegisterCount} color='info'
                                    icon={'ant-design:edit-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <WebsiteAccessInfoBlock title='Total register count' total={totalRegisterCount} color='success'
                                    icon={'ant-design:fullscreen-exit-outlined'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <WebsiteAccessInfoGraph
              title='Website Access Count'
              subheader='(Recent 10 days)'
              chartLabels={graphDate}
              chartData={[
                {
                  name: 'Visit Count',
                  type: 'area',
                  fill: 'gradient',
                  data: graphVisitCount,
                },
                {
                  name: 'Register Count',
                  type: 'area',
                  fill: 'gradient',
                  data: graphRegisterCount,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title='Current Visits'
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          {/*<Grid item xs={12} md={6} lg={8}>*/}
          {/*  <AppConversionRates*/}
          {/*    title="Conversion Rates"*/}
          {/*    subheader="(+43%) than last year"*/}
          {/*    chartData={[*/}
          {/*      { label: 'Italy', value: 400 },*/}
          {/*      { label: 'Japan', value: 430 },*/}
          {/*      { label: 'China', value: 448 },*/}
          {/*      { label: 'Canada', value: 470 },*/}
          {/*      { label: 'France', value: 540 },*/}
          {/*      { label: 'Germany', value: 580 },*/}
          {/*      { label: 'Netherlands', value: 1100 },*/}
          {/*      { label: 'United States', value: 1200 },*/}
          {/*      { label: 'United Kingdom', value: 1380 },*/}
          {/*    ]}*/}
          {/*  />*/}
          {/*</Grid>*/}

          {/*<Grid item xs={12} md={6} lg={4}>*/}
          {/*  <AppCurrentSubject*/}
          {/*    title="Current Subject"*/}
          {/*    chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}*/}
          {/*    chartData={[*/}
          {/*      { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },*/}
          {/*      { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },*/}
          {/*      { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },*/}
          {/*    ]}*/}
          {/*    chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}*/}
          {/*  />*/}
          {/*</Grid>*/}

          {/*<Grid item xs={12} md={6} lg={8}>*/}
          {/*  <AppNewsUpdate*/}
          {/*    title="News Update"*/}
          {/*    list={[...Array(5)].map((_, index) => ({*/}
          {/*      id: faker.datatype.uuid(),*/}
          {/*      title: faker.name.jobTitle(),*/}
          {/*      description: faker.name.jobTitle(),*/}
          {/*      image: `/assets/images/covers/cover_${index + 1}.jpg`,*/}
          {/*      postedAt: faker.date.recent(),*/}
          {/*    }))}*/}
          {/*  />*/}
          {/*</Grid>*/}

          {/*<Grid item xs={12} md={6} lg={4}>*/}
          {/*  <AppOrderTimeline*/}
          {/*    title="Order Timeline"*/}
          {/*    list={[...Array(5)].map((_, index) => ({*/}
          {/*      id: faker.datatype.uuid(),*/}
          {/*      title: [*/}
          {/*        '1983, orders, $4220',*/}
          {/*        '12 Invoices have been paid',*/}
          {/*        'Order #37745 from September',*/}
          {/*        'New order placed #XF-2356',*/}
          {/*        'New order placed #XF-2346',*/}
          {/*      ][index],*/}
          {/*      type: `order${index + 1}`,*/}
          {/*      time: faker.date.past(),*/}
          {/*    }))}*/}
          {/*  />*/}
          {/*</Grid>*/}

          {/*<Grid item xs={12} md={6} lg={4}>*/}
          {/*  <AppTrafficBySite*/}
          {/*    title="Traffic by Site"*/}
          {/*    list={[*/}
          {/*      {*/}
          {/*        name: 'FaceBook',*/}
          {/*        value: 323234,*/}
          {/*        icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,*/}
          {/*      },*/}
          {/*      {*/}
          {/*        name: 'Google',*/}
          {/*        value: 341212,*/}
          {/*        icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,*/}
          {/*      },*/}
          {/*      {*/}
          {/*        name: 'Linkedin',*/}
          {/*        value: 411213,*/}
          {/*        icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,*/}
          {/*      },*/}
          {/*      {*/}
          {/*        name: 'Twitter',*/}
          {/*        value: 443232,*/}
          {/*        icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,*/}
          {/*      },*/}
          {/*    ]}*/}
          {/*  />*/}
          {/*</Grid>*/}

          {/*<Grid item xs={12} md={6} lg={8}>*/}
          {/*  <AppTasks*/}
          {/*    title="Tasks"*/}
          {/*    list={[*/}
          {/*      { id: '1', label: 'Create FireStone Logo' },*/}
          {/*      { id: '2', label: 'Add SCSS and JS files if required' },*/}
          {/*      { id: '3', label: 'Stakeholder Meeting' },*/}
          {/*      { id: '4', label: 'Scoping & Estimations' },*/}
          {/*      { id: '5', label: 'Sprint Showcase' },*/}
          {/*    ]}*/}
          {/*  />*/}
          {/*</Grid>*/}
        </Grid>
      </Container>
    </>
  );
}

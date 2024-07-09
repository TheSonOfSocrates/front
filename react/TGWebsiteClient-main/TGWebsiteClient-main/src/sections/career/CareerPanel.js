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
import { TabContext, TabList, TabPanel } from '@mui/lab';
// hooks
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect, useState } from 'react';
// components
import { MotionViewport } from '../../components/animate';
import JobApplyForm from './JobApplyForm';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  textAlign: 'center',
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
  },
}));

// ----------------------------------------------------------------------

export default function CareerPanel() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const isLight = theme.palette.mode === 'light';

  const shadow = `-40px 40px 80px ${alpha(
    isLight ? theme.palette.grey[500] : theme.palette.common.black,
    0.48,
  )}`;

  const displayContent = {
    'badge': 'WELCOME',
    'header-p1': 'Senior Frontend Developer',
    'header-p2': 'Position',
    'description': "Our hiring process is incredibly streamlined and efficient. We've condensed the traditional four-step process into just one step. Even if you have no prior experience, if you are a qualified, legitimate candidate with a strong educational background, the necessary skills and a strong desire to learn, we can handle everything over a simple 10-minute video call. This call will serve as an opportunity for us to introduce ourselves to each other and officially confirm that we are embarking on a collaborative journey together. We're excited for you to join our team and work with us to make a transformative impact on the world. We look forward to welcoming you on board soon.",
  };

  useEffect(() => {

  }, [dispatch]);

  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <Box mt={5} mb={5}>
          <Box textAlign="center">
            <Container>
              <Typography variant='overline' style={{ margin: 'auto' }} color='textSecondary'>{displayContent['badge']}</Typography>
              <Typography variant='h3' component='h2' gutterBottom={true}>
                <Typography variant='h3' component='span'
                  color='primary'>{displayContent['header-p1']} </Typography>
                <Typography variant='h3' component='span'>{displayContent['header-p2']}</Typography>
              </Typography>
            </Container>
          </Box>
        </Box>

        <Typography variant='subtitle1' color='textSecondary'>{displayContent['description']}</Typography>

        <div><h3>Requirements </h3><ul class="posting-requirements plain-list"><ul><li>At least 8 years of experience working as a software developer.</li><li>At least 5 years of experience in developing and maintaining the front end of web applications.</li><li>Expertise in React/ReactJS and Typescript.</li><li>Advanced knowledge of JavaScript, jQuery, CSS, and HTML5.</li><li>Ability to clearly explain and justify ideas when faced with competing alternatives to enterprise clients and senior team members.</li><li>Experience with Git version control and Agile software development methodologies.</li><li>Experience with Agile development methodologies.</li></ul></ul></div>

        <div><h3>Nice to have</h3><ul class="posting-requirements plain-list"><ul><li>Experience working with microservices or enterprise APIs/integration.</li><li>Experience working with databases (PostgreSQL, MongoDB, etc.).</li><li>Experience working with Java / Spring / Spring Boot or NodeJS</li><li>Experience with DevOps tools such as Gitlab CI/CD, Kubernetes, Helm, OpenShift, AWS Services, or Docker.</li></ul></ul></div>

        <div style={{marginTop: 30, marginBottom: 50}}>
          <div><span>The TG is a highly curated set of the best software
            developers in the world. It's not easy to become part of this select network - but when you do - you will
            work amongst the best around the world.</span></div>
          <div></div>
          <div><span>Our model is unique in the software development industry. We do the hard work of
            finding the clients all over the world and scoping their projects - and you get to choose from a large variety of 'Gigs'.
            You can choose Gigs that fit your schedule - from 10, 20, or 40 hours a week. You also get to choose your
            pay rate. All projects are staffed with a project manager, full stack team, QA, and DevOps.</span></div>
          <div></div>
          <div><span>All of our projects are for top-tier companies and are delivered with the
            highest quality. We even produce a case study for every project delivered - so you can take that with you as
            part of your portfolio.</span></div>
          <div></div>
          <div><span>In parallel - you will have access to an exclusive and energized network of the
            world's most skilled experts. Community members collaborate inside and outside of TG - as well as at local
            community events, online hackathons, competitions, etc. The TG is more than a simple
            marketplace - it's truly an exclusive club.</span></div>
          <div></div>
          <div><span>Are you talented enough to be in the club?</span></div>
        </div>

        <JobApplyForm />

      </Container>
    </StyledRoot>
  );
}

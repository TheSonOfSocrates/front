import { useId } from 'react';
import { m } from 'framer-motion';
import { Stack, Box } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { useSettingsContext } from 'components/settings//SettingsContext';

const StyledButton = styled(Stack)(({ theme }) => ({
  width: 56,
  height: 56,
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
  position: 'relative',
  color: theme.palette.text.primary,
  transform: 'scale(0.7)',
  '&::after': {
    content: '""',
    transition: 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)',
    position: 'absolute',
    inset: 0,
    zIndex: -1,
    background: alpha(theme.palette.text.primary, 0),
    clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)',
    '&:hover': {},
  },
  '&:hover': {
    '&::after': {
      background: alpha(theme.palette.text.primary, 0.1),
    },
  },
}));

const StyledIcon = styled(Box)(({ theme }) => ({
  width: 38,
  height: 38,
  '& .circle': {
    fill: 'currentColor',
    transform: theme.palette.mode == 'dark' ? 'none' : 'scale(0.6)',
    transformOrigin: 'center',
    transitionProperty: 'transform, fill',
    transitionDuration: '0.6s',
    transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    transitionDelay: theme.palette.mode == 'dark' ? '0.3s' : '0s',
    '&.datamask': {
      fill: 'white',
    },
  },
  '& .mask': {
    fill: 'black',
    transform: theme.palette.mode == 'dark' ? 'none' : 'translate3d(100%, -100%, 0)',
    transition: 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
    transitionDelay: theme.palette.mode == 'dark' ? '0.3s' : '0s',
  },
  '& .path': {
    stroke: 'currentColor',
    fill: 'none',
    strokeLinecap: 'round',
    strokeWidth: 3,
    strokeDasharray: '7 7',
    strokeDashoffset: theme.palette.mode == 'dark' ? 7 : 0,
    opacity: theme.palette.mode == 'dark' ? 0 : 1,
    transitionProperty: 'stroke-dashoffset, opacity',
    transitionDuration: '0.6s',
    transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    transitionDelay: theme.palette.mode == 'dark' ? '0s' : '0.3s',
  },
}));

export default function ThemeToggleButton() {
  const { themeMode, onToggleMode } = useSettingsContext();
  const id = useId();
  const maskId = `${id}theme-toggle-mask`;

  return (
    <StyledButton onClick={onToggleMode}>
      <StyledIcon>
        <svg id="svg" width="38" height="38" viewBox="0 0 38 38">
          <defs>
            <mask id={maskId}>
              <circle className="circle datamask" cx="19" cy="19" r="13" />
              <circle className="mask" cx="25" cy="14" r="9" />
            </mask>
          </defs>
          <path
            className="path"
            d="M19 3v7M19 35v-7M32.856 11l-6.062 3.5M5.144 27l6.062-3.5M5.144 11l6.062 3.5M32.856 27l-6.062-3.5"
          />
          <circle className="circle" mask={`url(#${maskId})`} cx="19" cy="19" r="12" />
        </svg>
      </StyledIcon>
    </StyledButton>
  );
}
